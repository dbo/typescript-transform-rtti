import type { StringBasedUnion } from "../types.js";

export type T = rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>;
export type T2 = string | rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>;
export type T3 = string & rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>;
export function fn(
    arg: rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>,
): rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")> {
    return null!;
}
export const v = <rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>>null!;
export let v2 = <rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>>null!;
export var v3 = <rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>>null!;
export const lit = <rtti.LiteralsOf<42 | (StringBasedUnion & "two-value")>[]>(
    rtti.literalsOf<42 | (StringBasedUnion & "two-value")>()
);
export const lit2 = rtti.literalsOf<42 | (StringBasedUnion & "two-value")>() as rtti.LiteralsOf<
    42 | (StringBasedUnion & "two-value")
>[];
