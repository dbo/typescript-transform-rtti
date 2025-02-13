import { StringBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<StringBasedEnum.three>;
export type T2 = string | rtti.LiteralsOf<StringBasedEnum.three>;
export type T3 = string & rtti.LiteralsOf<StringBasedEnum.three>;
export function fn(
    arg: rtti.LiteralsOf<StringBasedEnum.three>,
): rtti.LiteralsOf<StringBasedEnum.three> {
    return null!;
}
export const v = <rtti.LiteralsOf<StringBasedEnum.three>>null!;
export let v2 = <rtti.LiteralsOf<StringBasedEnum.three>>null!;
export var v3 = <rtti.LiteralsOf<StringBasedEnum.three>>null!;
export const lit = <rtti.LiteralsOf<StringBasedEnum.three>[]>(
    rtti.literalsOf<StringBasedEnum.three>()
);
export const lit2 =
    rtti.literalsOf<StringBasedEnum.three>() as rtti.LiteralsOf<StringBasedEnum.three>[];
