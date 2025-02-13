import { NumberBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<NumberBasedEnum>;
export type T2 = string | rtti.LiteralsOf<NumberBasedEnum>;
export type T3 = string & rtti.LiteralsOf<NumberBasedEnum>;
export function fn(arg: rtti.LiteralsOf<NumberBasedEnum>): rtti.LiteralsOf<NumberBasedEnum> {
    return null!;
}
export const v = <rtti.LiteralsOf<NumberBasedEnum>>null!;
export let v2 = <rtti.LiteralsOf<NumberBasedEnum>>null!;
export var v3 = <rtti.LiteralsOf<NumberBasedEnum>>null!;
export const lit = <rtti.LiteralsOf<NumberBasedEnum>[]>rtti.literalsOf<NumberBasedEnum>();
export const lit2 = rtti.literalsOf<NumberBasedEnum>() as rtti.LiteralsOf<NumberBasedEnum>[];
