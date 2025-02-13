import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
    Inter,
    NumberBasedEnum,
    NumberBasedUnion,
    StringBasedEnum,
    StringBasedUnion,
    type MixedUnion,
} from "./types.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function assertSameSet(ar1: any[], ar2: any[]) {
    const len = ar1.length;
    assert.equal(len, ar2.length, "should have same number of items");
    // purge out duplicates
    ar1 = Array.from(new Set(ar1));
    ar2 = Array.from(new Set(ar2));
    assert.equal(len, ar1.length, "no duplicates (1)");
    assert.equal(len, ar2.length, "no duplicates (2)");
    ar1.forEach((e) => assert.ok(ar2.includes(e), `should have ${e}`));
}

function assertTypeLiteralsOf(literals: (string | number)[], file: string, skipFirst: number = 0) {
    const str = String(readFileSync(join(__dirname, "TypeLiteralsOf-cases", `${file}.d.ts`)));
    const actLines = str.split("\n");
    while (skipFirst--) {
        actLines.shift();
    }

    const lit = literals.map((elem) => (typeof elem === "string" ? `"${elem}"` : elem)).join(" | ");
    const exp = `export type T = ${lit};
export type T2 = string | (${lit});
export type T3 = string & (${lit});
export declare function fn(arg: ${lit}): ${lit};
export declare const v: ${lit};
export declare let v2: ${lit};
export declare var v3: ${lit};
export declare const lit: (${lit})[];
export declare const lit2: (${lit})[];
//# sourceMappingURL=${file}.d.ts.map`;

    const expLines = exp.split("\n");
    assert.equal(actLines.length, expLines.length, "same number of lines");
    for (let i = 0; i < actLines.length; ++i) {
        assert.equal(
            actLines[i],
            expLines[i],
            `expected shape should match line ${i} for ${file}.d.ts`,
        );
    }
}

describe("rtti.literalsOf<>(), rtti.LiteralsOf<>", () => {
    it("const string enum", () => {
        const exp = ["one-value", "two-value", "three-value"];
        assertSameSet(rtti.literalsOf<StringBasedEnum>(), exp);
        assertTypeLiteralsOf(exp, "const-string-enum", 1);
    });
    it("single const string enum", () => {
        const exp = ["three-value"];
        assertSameSet(rtti.literalsOf<StringBasedEnum.three>(), exp);
        assertTypeLiteralsOf(exp, "single-const-string-enum", 1);
    });
    it("const number enum", () => {
        const exp = [1, 2, 3];
        assertSameSet(rtti.literalsOf<NumberBasedEnum>(), exp);
        assertTypeLiteralsOf(exp, "const-number-enum", 1);
    });
    it("single const number enum", () => {
        const exp = [3];
        assertSameSet(rtti.literalsOf<NumberBasedEnum.three>(), exp);
        assertTypeLiteralsOf(exp, "single-const-number-enum", 1);
    });
    it("string literal union", () => {
        const exp = ["one-value", "two-value", "three-value"];
        assertSameSet(rtti.literalsOf<StringBasedUnion>(), exp);
        assertTypeLiteralsOf(exp, "string-literal-union", 1);
    });
    it("single string", () => {
        const exp = ["foo"];
        assertSameSet(rtti.literalsOf<"foo">(), exp);
        assertTypeLiteralsOf(exp, "single-string");
    });
    it("number literal union", () => {
        const exp = [1, 2, 3];
        assertSameSet(rtti.literalsOf<NumberBasedUnion>(), exp);
        assertTypeLiteralsOf(exp, "number-literal-union", 1);
    });
    it("single number", () => {
        const exp = [4];
        assertSameSet(rtti.literalsOf<4>(), exp);
        assertTypeLiteralsOf(exp, "single-number");
    });
    it("mixed literal union", () => {
        const exp = [1, 2, 3, "one-value", "two-value", "three-value", 42, "foo"];
        assertSameSet(rtti.literalsOf<NumberBasedUnion | StringBasedEnum | 42 | "foo">(), exp);
        assertTypeLiteralsOf(exp, "mixed-literal-union", 1);
    });
    it("mixed literal union with duplicates from const enum", () => {
        const exp = [1, 2, 3, "one-value", "two-value", "three-value", 42, "foo"];
        assertSameSet(
            rtti.literalsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">(),
            exp,
        );
        assertTypeLiteralsOf(exp, "mixed-literal-union-duplicates", 1);
    });
    it("keyof shape", () => {
        const exp = ["a", "b", "c"];
        assertSameSet(rtti.literalsOf<keyof Inter>(), exp);
        assertSameSet(
            rtti.literalsOf<
                keyof {
                    a: 5;
                    b: 7;
                    c: {
                        nested: string;
                    };
                }
            >(),
            exp,
        );
        assertTypeLiteralsOf(exp, "keyof-shape", 1);
    });

    it("intersection", () => {
        const exp = ["two-value"];
        assertSameSet(rtti.literalsOf<StringBasedEnum & StringBasedEnum.two>(), exp);
        assertTypeLiteralsOf(exp, "intersection", 1);
    });

    it("nested intersection", () => {
        const exp = [42, "two-value"];
        assertSameSet(rtti.literalsOf<42 | (StringBasedUnion & "two-value")>(), exp);
        assertTypeLiteralsOf(exp, "nested-intersection", 1);
    });

    it("mixed", () => {
        const exp = ["one-value", "two-value", "three-value", "6", 7, "eight", 5];
        const act = rtti.literalsOf<StringBasedEnum | MixedUnion | "eight" | 5>();
        assertSameSet(act, exp);
        assertTypeLiteralsOf(exp, "mixed", 1);
    });

    it("weird example", () => {
        const exp = [5, 9, "a", "b", "c", "str", "one-value", "three-value"];
        type ZZ =
            | 5
            | (7 & 8)
            | 9
            | keyof Inter
            | "str"
            | Exclude<StringBasedEnum, StringBasedEnum.two>;
        const act = rtti.literalsOf<ZZ>();
        assertSameSet(act, exp);
        assertTypeLiteralsOf(exp, "weird-example", 1);
    });
});
