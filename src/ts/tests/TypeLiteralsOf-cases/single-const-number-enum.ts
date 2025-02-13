import { NumberBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<NumberBasedEnum.three>;
export type T2 = string | rtti.LiteralsOf<NumberBasedEnum.three>;
export type T3 = string & rtti.LiteralsOf<NumberBasedEnum.three>;
export function fn(
    arg: rtti.LiteralsOf<NumberBasedEnum.three>,
): rtti.LiteralsOf<NumberBasedEnum.three> {
    return null!;
}
export const v = <rtti.LiteralsOf<NumberBasedEnum.three>>null!;
export let v2 = <rtti.LiteralsOf<NumberBasedEnum.three>>null!;
export var v3 = <rtti.LiteralsOf<NumberBasedEnum.three>>null!;
export const lit = <rtti.LiteralsOf<NumberBasedEnum.three>[]>(
    rtti.literalsOf<NumberBasedEnum.three>()
);
export const lit2 =
    rtti.literalsOf<NumberBasedEnum.three>() as rtti.LiteralsOf<NumberBasedEnum.three>[];
