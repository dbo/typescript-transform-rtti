import { NumberBasedUnion } from "../types.js";

export type T = rtti.LiteralsOf<NumberBasedUnion>;
export type T2 = string | rtti.LiteralsOf<NumberBasedUnion>;
export type T3 = string & rtti.LiteralsOf<NumberBasedUnion>;
export function fn(arg: rtti.LiteralsOf<NumberBasedUnion>): rtti.LiteralsOf<NumberBasedUnion> {
    return null!;
}
export const v = <rtti.LiteralsOf<NumberBasedUnion>>null!;
export let v2 = <rtti.LiteralsOf<NumberBasedUnion>>null!;
export var v3 = <rtti.LiteralsOf<NumberBasedUnion>>null!;
export const lit = <rtti.LiteralsOf<NumberBasedUnion>[]>rtti.literalsOf<NumberBasedUnion>();
export const lit2 = rtti.literalsOf<NumberBasedUnion>() as rtti.LiteralsOf<NumberBasedUnion>[];
