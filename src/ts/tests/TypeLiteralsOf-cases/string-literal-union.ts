import { StringBasedUnion } from "../types.js";

export type T = rtti.LiteralsOf<StringBasedUnion>;
export type T2 = string | rtti.LiteralsOf<StringBasedUnion>;
export type T3 = string & rtti.LiteralsOf<StringBasedUnion>;
export function fn(arg: rtti.LiteralsOf<StringBasedUnion>): rtti.LiteralsOf<StringBasedUnion> {
    return null!;
}
export const v = <rtti.LiteralsOf<StringBasedUnion>>null!;
export let v2 = <rtti.LiteralsOf<StringBasedUnion>>null!;
export var v3 = <rtti.LiteralsOf<StringBasedUnion>>null!;
export const lit = <rtti.LiteralsOf<StringBasedUnion>[]>rtti.literalsOf<StringBasedUnion>();
export const lit2 = rtti.literalsOf<StringBasedUnion>() as rtti.LiteralsOf<StringBasedUnion>[];
