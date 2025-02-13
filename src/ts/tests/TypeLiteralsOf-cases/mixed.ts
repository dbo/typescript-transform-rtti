import type { MixedUnion, StringBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>;
export type T2 = string | rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>;
export type T3 = string & rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>;
export function fn(
    arg: rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>,
): rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5> {
    return null!;
}
export const v = <rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>>null!;
export let v2 = <rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>>null!;
export var v3 = <rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>>null!;
export const lit = <rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>[]>(
    rtti.literalsOf<StringBasedEnum | MixedUnion | "eight" | 5>()
);
export const lit2 = rtti.literalsOf<
    StringBasedEnum | MixedUnion | "eight" | 5
>() as rtti.LiteralsOf<StringBasedEnum | MixedUnion | "eight" | 5>[];
