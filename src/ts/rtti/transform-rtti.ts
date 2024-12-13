import * as ts from "typescript";
import type { TransformerExtras, PluginConfig } from "ts-patch";

export default function rtti(
    program: ts.Program,
    pluginConfig: PluginConfig & {
        namespace?: string;
        literalsOf?: string;
    },
    { ts: tsInstance, addDiagnostic }: TransformerExtras,
) {
    const { namespace = "rtti", literalsOf = "literalsOf" } = pluginConfig;
    const typeChecker = program.getTypeChecker();

    return (ctx: ts.TransformationContext) => {
        const { factory } = ctx;

        return (sourceFile: ts.SourceFile) => {
            function visit(node: ts.Node): ts.Node {
                if (
                    tsInstance.isCallExpression(node) &&
                    tsInstance.isPropertyAccessExpression(node.expression) &&
                    tsInstance.isIdentifier(node.expression.expression) &&
                    node.expression.expression.escapedText === namespace &&
                    tsInstance.isIdentifier(node.expression.name)
                ) {
                    if (node.expression.name.escapedText === literalsOf) {
                        const typeArgs = node.typeArguments || [];
                        if (typeArgs.length < 1 || typeArgs.length > 2) {
                            addDiagnostic(
                                ts.createDiagnosticForNodeInSourceFile(
                                    sourceFile,
                                    node,
                                    errDiagMessageFor(
                                        DiagCodes.RTTI_UNEXPECTED_NUMBER_OF_TYPEARGS,
                                        `unexpected number of type args: ${typeArgs.length}`,
                                    ),
                                ),
                            );
                        } else {
                            type LiteralT = string | number;
                            const litType = typeChecker.getTypeFromTypeNode(typeArgs[0]!);

                            const collectLiterals = (type: ts.Type, res: LiteralT[]) => {
                                if (type) {
                                    if (type.isStringLiteral() || type.isNumberLiteral()) {
                                        res.push(type.value);
                                        return;
                                    }
                                    if (type.isUnion()) {
                                        for (const t of type.types) {
                                            collectLiterals(t, res);
                                        }
                                        return;
                                    } else if (type.isIntersection()) {
                                        let more: string[] = [];
                                        for (let i = 0; i < type.types.length; ++i) {
                                            const intersectWith: string[] = i ? [] : more;
                                            collectLiterals(type.types[i]!, intersectWith);
                                            if (!i) {
                                                continue;
                                            }
                                            more = more.filter((v) => intersectWith.includes(v));
                                            if (!more.length) {
                                                // early exit
                                                break;
                                            }
                                        }
                                        res.push(...more);
                                        return;
                                    }
                                }

                                addDiagnostic(
                                    ts.createDiagnosticForNodeInSourceFile(
                                        sourceFile,
                                        typeArgs[0]!,
                                        errDiagMessageFor(
                                            DiagCodes.RTTI_UNEXPECTED_TYPEARG,
                                            `unexpected type arg: ${typeChecker.typeToString(litType)}`,
                                        ),
                                    ),
                                );
                            };

                            let final: LiteralT[] = [];
                            collectLiterals(litType, final);
                            final = Array.from(new Set(final));

                            return factory.createArrayLiteralExpression(
                                final.map((v) =>
                                    typeof v === "number"
                                        ? factory.createNumericLiteral(v)
                                        : factory.createStringLiteral(v),
                                ),
                            );
                        }
                    }
                }
                return tsInstance.visitEachChild(node, visit, ctx);
            }
            return tsInstance.visitNode(sourceFile, visit);
        };
    };
}

enum DiagCodes {
    RTTI_UNEXPECTED_NUMBER_OF_TYPEARGS = 100000,
    RTTI_UNEXPECTED_TYPEARG = 100001,
}

function errDiagMessageFor(code: DiagCodes, message: string): ts.DiagnosticMessage {
    return {
        category: ts.DiagnosticCategory.Error,
        code,
        key: DiagCodes[code],
        message,
    };
}
