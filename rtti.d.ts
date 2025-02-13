declare namespace rtti {
    /**
     * Emits a unique set of literals based on a given literal union/intersection type.
     *
     * @attention Don't rely on a particular order.
     * @attention Supports const enums and keyof/unions/intersections for strings and numbers only.
     * Intersecting const enum with enum value results in never.
     * An inferred `never` type will result in an error.
     */
    function literalsOf<T extends string | number>(): T[];

    /**
     * Type-level variant to emit to .d.ts files (only!), e.g.
     *
     * Emits a unique set of literals based on a given literal union/intersection type.
     * Use a type assertion to flatten out to a literal type in .d.ts files, e.g.
     *
     * export const myLiterals: <rtti.LiteralsOf<Foo>>rtti.literalsOf<Foo>();
     *
     * @attention don't forget to set up a separate rtti transformer with
     * `"afterDeclarations": true` in your tsconfig.json.
     */
    type LiteralsOf<T extends string | number> = T;
}
