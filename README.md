# typescript-transform-rtti

<a href="https://github.com/dbo/typescript-transform-rtti/actions">![CI](https://github.com/dbo/typescript-transform-rtti/actions/workflows/ci.yml/badge.svg)</a>
<a href="https://www.npmjs.com/package/typescript-transform-rtti">![NPM Version](https://img.shields.io/npm/v/typescript-transform-rtti)</a>

This transformer emits runtime type information (RTTI) about typescript types.

There's currently just one intrinsic function that emits an array of values about literal unions and const enums, see [rtti.d.ts](./rtti.d.ts).

## `rtti.literalsOf<>()`

An intrinsic function that gets replaced with a unique set of values about literal unions and const enums per type argument.
Don't rely on a particular order.

This is useful for runtime validation of values, e.g. using [zod](https://zod.dev/).

```typescript
export const enum StringBasedEnum {
    one = "1",
    two = "2",
}
z.enum(rtti.literalsOf<StringBasedEnum>() /* << replaced with ["1", "2"] */);

// mixed types:
type Another = "6" | 7;
const literals = rtti.literalsOf<
    StringBasedEnum | Another | "eight" | 5
>(); /* << replaced with ["1", "2", "6", 7, "eight", 5] */
```

## Generic type `rtti.LiteralsOf<>` for declaration files (.d.ts)
Emitting the literals (`rtti.literalsOf<>()` preserves the exact type as inferred by the compiler in your .d.ts files. In case you want to flatten out
your literals type-wise, e.g. get rid of const enums in **declaration files**, you need to set up a **separate** transformer in your `tsconfig.json` for .d.ts files.

This will rewrite generics like `rtti.LiteralsOf<Foo>` into a literal union type in your .d.ts files.

## Installation

Use it alongside with `typescript` and [`ts-patch`](https://github.com/nonara/ts-patch) as a dev dependency, e.g.

```bash
$ npm install typescript-transform-rtti --save-dev
```

Add it as a plugin in your `tsconfig.json`:

```json5
    "compilerOptions": {
        //...
        "plugins": [{
            "transform": "typescript-transform-rtti"
            // extra options for renaming
            // `rtti` or `literalsOf` here
        }, { // .d.ts: the below only when you need to rewrite your .d.ts via rtti.LiteralsOf<>
            "transform": "typescript-transform-rtti",
            "afterDeclarations": true
            // extra options for renaming
            // `rtti` or `TypeLiteralsOf` here
        }]
    },
    "include": [
        //...
        // Integrate the def file for rtti.*:
        // Copy and tweak to your needs if you change
        // `namespace` or `literalsOf` resp. `TypeLiteralsOf`.
        "./node_modules/typescript-transform-rtti/rtti.d.ts"
    ]
```

You can customize the transformer with the following options:

- `namespace?: string` -- Namespace to use for intrinsics, defaults to `"rtti"`.
- `literalsOf?: string` -- Function name for literals to detect, defaults to `"literalsOf"`.
