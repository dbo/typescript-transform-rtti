import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { readTestFile } from "./test-util.js";
import { StringBasedEnum } from "./types.js";

export type TT = rtti.LiteralsOf<StringBasedEnum>;

export class List<T> {
    item: T = null as T;
}

export class Foo {
    loo: any;
    zoo: string = "";
    declare foo: string;
    declare bar: List<TT>;
    declare baz: rtti.LiteralsOf<StringBasedEnum>;
}

export const expConst: rtti.LiteralsOf<StringBasedEnum>[] = rtti.literalsOf<StringBasedEnum>();
export declare const declConst: rtti.LiteralsOf<StringBasedEnum>[];

describe("rtti.LiteralsOf<> decl", () => {
    it("should not add declared field to class", () => {
        const obj = new Foo();
        ["foo", "bar", "baz"].forEach((prop) =>
            assert.ok(!(prop in obj), `should not have property ${prop}`),
        );
    });

    it("should preserve declared field in .d.ts", () => {
        const actLines = readTestFile(__filename.replace(/\.js$/, ".d.ts"), 1);
        actLines.pop(); // sourcemap line
        const act = actLines.join("\n");

        assert.equal(
            act,
            `export type TT = "one-value" | "two-value" | "three-value";
export declare class List<T> {
    item: T;
}
export declare class Foo {
    loo: any;
    zoo: string;
    foo: string;
    bar: List<TT>;
    baz: "one-value" | "two-value" | "three-value";
}
export declare const expConst: ("one-value" | "two-value" | "three-value")[];
export declare const declConst: ("one-value" | "two-value" | "three-value")[];`,
            "correct output",
        );
    });
});
