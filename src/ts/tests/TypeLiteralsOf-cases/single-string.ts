export type T = rtti.LiteralsOf<"foo">;
export type T2 = string | rtti.LiteralsOf<"foo">;
export type T3 = string & rtti.LiteralsOf<"foo">;
export function fn(arg: rtti.LiteralsOf<"foo">): rtti.LiteralsOf<"foo"> {
    return null!;
}
export const v = <rtti.LiteralsOf<"foo">>null!;
export let v2 = <rtti.LiteralsOf<"foo">>null!;
export var v3 = <rtti.LiteralsOf<"foo">>null!;
export const lit = <rtti.LiteralsOf<"foo">[]>rtti.literalsOf<"foo">();
export const lit2 = rtti.literalsOf<"foo">() as rtti.LiteralsOf<"foo">[];
