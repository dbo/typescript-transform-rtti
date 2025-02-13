import type { Inter, StringBasedEnum } from "../types.js";

export type T = rtti.LiteralsOf<
    5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
>;
export type T2 =
    | string
    | rtti.LiteralsOf<
          5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
      >;
export type T3 = string &
    rtti.LiteralsOf<
        5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
    >;
export function fn(
    arg: rtti.LiteralsOf<
        5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
    >,
): rtti.LiteralsOf<
    5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
> {
    return null!;
}
export const v = <
    rtti.LiteralsOf<
        5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
    >
>null!;
export let v2 = <
    rtti.LiteralsOf<
        5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
    >
>null!;
export var v3 = <
    rtti.LiteralsOf<
        5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
    >
>null!;
export const lit = <
    rtti.LiteralsOf<
        5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
    >[]
>rtti.literalsOf<
    5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
>();
export const lit2 = rtti.literalsOf<
    5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
>() as rtti.LiteralsOf<
    5 | (7 & 8) | 9 | keyof Inter | "str" | Exclude<StringBasedEnum, StringBasedEnum.two>
>[];
