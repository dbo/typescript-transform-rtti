import type { NumberBasedUnion, StringBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">;
export type T2 =
    | string
    | rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">;
export type T3 = string &
    rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">;
export function fn(
    arg: rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">,
): rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo"> {
    return null!;
}
export const v = <
    rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">
>null!;
export let v2 = <
    rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">
>null!;
export var v3 = <
    rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">
>null!;
export const lit = <
    rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">[]
>rtti.literalsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">();
export const lit2 = rtti.literalsOf<
    NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo"
>() as rtti.LiteralsOf<NumberBasedUnion | StringBasedEnum | StringBasedEnum | 42 | "foo">[];
