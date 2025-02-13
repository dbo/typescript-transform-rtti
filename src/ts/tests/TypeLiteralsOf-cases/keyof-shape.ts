import type { Inter } from "../types.js";

export type T = rtti.LiteralsOf<keyof Inter>;
export type T2 = string | rtti.LiteralsOf<keyof Inter>;
export type T3 = string & rtti.LiteralsOf<keyof Inter>;
export function fn(arg: rtti.LiteralsOf<keyof Inter>): rtti.LiteralsOf<keyof Inter> {
    return null!;
}
export const v = <rtti.LiteralsOf<keyof Inter>>null!;
export let v2 = <
    rtti.LiteralsOf<
        keyof {
            a: 5;
            b: 7;
            c: {
                nested: string;
            };
        }
    >
>null!;
export var v3 = <rtti.LiteralsOf<keyof Inter>>null!;
export const lit = <rtti.LiteralsOf<keyof Inter>[]>rtti.literalsOf<keyof Inter>();
export const lit2 = rtti.literalsOf<keyof Inter>() as rtti.LiteralsOf<
    keyof {
        a: 5;
        b: 7;
        c: {
            nested: string;
        };
    }
>[];
