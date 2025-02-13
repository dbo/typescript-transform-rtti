import type { PluginConfig, TransformerExtras } from "ts-patch";
import * as ts from "typescript";

export default function rtti(
    program: ts.Program,
    pluginConfig: PluginConfig & {
        namespace?: string;
        literalsOf?: string;
        TypeLiteralsOf?: string;
    },
    { ts: tsInstance, addDiagnostic }: TransformerExtras,
) {
    const {
        namespace = "rtti",
        literalsOf = "literalsOf",
        TypeLiteralsOf = "LiteralsOf",
    } = pluginConfig;

    const typeChecker = program.getTypeChecker();

    return (ctx: ts.TransformationContext) => {
        const { factory } = ctx;

        return (sourceFile: ts.SourceFile) => {
            type LiteralT = string | number;

            const getLiteralsFor = (node: ts.TypeNode): LiteralT[] => {
                const litType = typeChecker.getTypeFromTypeNode(node);

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
                            node,
                            errDiagMessageFor(
                                DiagCodes.RTTI_UNEXPECTED_TYPEARG,
                                `unexpected type arg: ${typeChecker.typeToString(litType)}`,
                            ),
                        ),
                    );
                };

                const final: LiteralT[] = [];
                collectLiterals(litType, final);
                return Array.from(new Set(final));
            };

            function visitType(node: ts.TypeNode): ts.TypeNode {
                if (ts.isArrayTypeNode(node)) {
                    // Transform the element type
                    const elementType = visitType(node.elementType);
                    if (elementType !== node.elementType) {
                        return factory.createArrayTypeNode(elementType);
                    }
                }

                if (
                    tsInstance.isTypeReferenceNode(node) &&
                    ts.isQualifiedName(node.typeName) &&
                    ts.isIdentifier(node.typeName.left) &&
                    ts.isIdentifier(node.typeName.right) &&
                    node.typeName.left.escapedText === namespace &&
                    node.typeName.right.escapedText === TypeLiteralsOf
                ) {
                    const typeArgs = node.typeArguments || [];
                    if (typeArgs.length !== 1) {
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
                        return node;
                    }

                    const literals = getLiteralsFor(typeArgs[0]!);
                    return factory.createUnionTypeNode(
                        literals.map((lit) =>
                            factory.createLiteralTypeNode(
                                typeof lit === "string"
                                    ? factory.createStringLiteral(lit)
                                    : factory.createNumericLiteral(lit),
                            ),
                        ),
                    );
                }

                if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
                    const types = node.types.map((t) => visitType(t));
                    if (ts.isUnionTypeNode(node)) {
                        return factory.createUnionTypeNode(types);
                    }
                    return factory.createIntersectionTypeNode(types);
                }
                if (ts.isTypeReferenceNode(node) && node.typeArguments) {
                    const newTypeArgs = node.typeArguments.map((t) => visitType(t));
                    return factory.createTypeReferenceNode(node.typeName, newTypeArgs);
                }

                return node;
            }

            function visit(node: ts.Node): ts.Node {
                if (ts.isTypeNode(node)) {
                    return visitType(node);
                }
                if (ts.isTypeAliasDeclaration(node)) {
                    return factory.updateTypeAliasDeclaration(
                        node,
                        node.modifiers,
                        node.name,
                        node.typeParameters,
                        visitType(node.type),
                    );
                }

                if (
                    tsInstance.isCallExpression(node) &&
                    tsInstance.isPropertyAccessExpression(node.expression) &&
                    tsInstance.isIdentifier(node.expression.expression) &&
                    node.expression.expression.escapedText === namespace &&
                    tsInstance.isIdentifier(node.expression.name)
                ) {
                    if (node.expression.name.escapedText === literalsOf) {
                        const typeArgs = node.typeArguments || [];
                        if (typeArgs.length !== 1) {
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
                            const literals = getLiteralsFor(typeArgs[0]!);
                            return factory.createArrayLiteralExpression(
                                literals.map((lit) =>
                                    typeof lit === "string"
                                        ? factory.createStringLiteral(lit)
                                        : factory.createNumericLiteral(lit),
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
