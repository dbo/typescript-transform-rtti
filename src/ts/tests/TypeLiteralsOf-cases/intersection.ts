import { StringBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>;
export type T2 = string | rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>;
export type T3 = string & rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>;
export function fn(
    arg: rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>,
): rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two> {
    return null!;
}
export const v = <rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>>null!;
export let v2 = <rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>>null!;
export var v3 = <rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>>null!;
export const lit = <rtti.LiteralsOf<StringBasedEnum & StringBasedEnum.two>[]>(
    rtti.literalsOf<StringBasedEnum & StringBasedEnum.two>()
);
export const lit2 = rtti.literalsOf<StringBasedEnum & StringBasedEnum.two>() as rtti.LiteralsOf<
    StringBasedEnum & StringBasedEnum.two
>[];
