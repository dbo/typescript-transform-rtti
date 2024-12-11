export const enum StringBasedEnum {
    one = "one-value",
    two = "two-value",
    three = "three-value",
}
export const enum NumberBasedEnum {
    one = 1,
    two = 2,
    three = 3,
}

export type StringBasedUnion = "one-value" | "two-value" | "three-value";
export type NumberBasedUnion = 1 | 2 | 3;

export interface Inter {
    a: 5;
    b: 7;
    c: {
        nested: string;
    };
}
