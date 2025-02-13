import { StringBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<StringBasedEnum>;
export type T2 = string | rtti.LiteralsOf<StringBasedEnum>;
export type T3 = string & rtti.LiteralsOf<StringBasedEnum>;
export function fn(arg: rtti.LiteralsOf<StringBasedEnum>): rtti.LiteralsOf<StringBasedEnum> {
    return null!;
}
export const v = <rtti.LiteralsOf<StringBasedEnum>>null!;
export let v2 = <rtti.LiteralsOf<StringBasedEnum>>null!;
export var v3 = <rtti.LiteralsOf<StringBasedEnum>>null!;
export const lit = <rtti.LiteralsOf<StringBasedEnum>[]>rtti.literalsOf<StringBasedEnum>();
export const lit2 = rtti.literalsOf<StringBasedEnum>() as rtti.LiteralsOf<StringBasedEnum>[];
