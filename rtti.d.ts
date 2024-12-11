declare namespace rtti {
    /**
     * Emits an array of literals based on a given literal union/intersection type.
     *
     * @attention Supports const enums and keyof/unions/intersections for strings and numbers only.
     * Intersecting const enum with enum value results in never.
     * An inferred `never` type will result in an error, i.e. your compilation crashes.
     * Set transformer option `ignoreErrors` to ignore and keep compiling.
     */
    export function literalsOf<T extends string | number>(): T[];
}
