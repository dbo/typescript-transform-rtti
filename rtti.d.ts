declare namespace rtti {
    /**
     * Emits a unique set of literals based on a given literal union/intersection type.
     *
     * @attention Don't rely on a particular order.
     * @attention Supports const enums and keyof/unions/intersections for strings and numbers only.
     * Intersecting const enum with enum value results in never.
     * An inferred `never` type will result in an error.
     */
    export function literalsOf<T extends string | number>(): T[];
}
