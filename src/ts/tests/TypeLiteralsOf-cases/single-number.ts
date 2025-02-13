export type T = rtti.LiteralsOf<4>;
export type T2 = string | rtti.LiteralsOf<4>;
export type T3 = string & rtti.LiteralsOf<4>;
export function fn(arg: rtti.LiteralsOf<4>): rtti.LiteralsOf<4> {
    return null!;
}
export const v = <rtti.LiteralsOf<4>>null!;
export let v2 = <rtti.LiteralsOf<4>>null!;
export var v3 = <rtti.LiteralsOf<4>>null!;
export const lit = <rtti.LiteralsOf<4>[]>rtti.literalsOf<4>();
export const lit2 = rtti.literalsOf<4>() as rtti.LiteralsOf<4>[];
