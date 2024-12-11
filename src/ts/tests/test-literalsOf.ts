import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import {
    Inter,
    NumberBasedEnum,
    NumberBasedUnion,
    StringBasedEnum,
    StringBasedUnion,
} from "./types.js";

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

describe("rtti.literalsOf", () => {
    it("const string enum", () => {
        assertSameSet(rtti.literalsOf<StringBasedEnum>(), [
            "one-value",
            "two-value",
            "three-value",
        ]);
    });
    it("single const string enum", () => {
        assertSameSet(rtti.literalsOf<StringBasedEnum.three>(), ["three-value"]);
    });
    it("const number enum", () => {
        assertSameSet(rtti.literalsOf<NumberBasedEnum>(), [1, 2, 3]);
    });
    it("single const number enum", () => {
        assertSameSet(rtti.literalsOf<NumberBasedEnum.three>(), [3]);
    });
    it("string literal union", () => {
        assertSameSet(rtti.literalsOf<StringBasedUnion>(), [
            "one-value",
            "two-value",
            "three-value",
        ]);
    });
    it("single string  ", () => {
        assertSameSet(rtti.literalsOf<"foo">(), ["foo"]);
    });
    it("number literal union", () => {
        assertSameSet(rtti.literalsOf<NumberBasedUnion>(), [1, 2, 3]);
    });
    it("single number  ", () => {
        assertSameSet(rtti.literalsOf<4>(), [4]);
    });
    it("mixed literal union", () => {
        assertSameSet(rtti.literalsOf<NumberBasedUnion | StringBasedEnum | 42 | "foo">(), [
            1,
            2,
            3,
            "one-value",
            "three-value",
            "two-value",
            42,
            "foo",
        ]);
    });
    it("mixed literal union with duplicates from const enum", () => {
        assertSameSet(
            rtti.literalsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">(),
            ["one-value", "three-value", "two-value", 1, 2, 3, 42, "foo"],
        );
    });
    it("keyof shape", () => {
        assertSameSet(rtti.literalsOf<keyof Inter>(), ["a", "b", "c"]);
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
            ["a", "b", "c"],
        );
    });

    it("intersection", () => {
        assertSameSet(rtti.literalsOf<StringBasedEnum & StringBasedEnum.two>(), ["two-value"]);
    });

    it("nested intersection", () => {
        assertSameSet(rtti.literalsOf<42 | (StringBasedUnion & "two-value")>(), [42, "two-value"]);
    });

    it("weird example", () => {
        type ZZ =
            | 5
            | (7 & 8)
            | 9
            | keyof Inter
            | "str"
            | Exclude<StringBasedEnum, StringBasedEnum.two>;
        const act = rtti.literalsOf<ZZ>();
        assertSameSet(act, [5, 9, "a", "b", "c", "str", "one-value", "three-value"]);
    });
});
