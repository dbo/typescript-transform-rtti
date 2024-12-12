# typescript-transform-rtti
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
>() /* << replaced with ["1", "2", "6", 7, "eight", 5] */;
```

## Installation
Use it alongside with `typescript` and [`ts-patch`](https://github.com/nonara/ts-patch) as a dev dependency, e.g.

```bash
$ npm install typescript-transform-rtti --save-dev
```

Add it as a plugin in your `tsconfig.json`:
```json
    "compilerOptions": {
        //...
        "plugins": [{
            "transform": "typescript-transform-rtti"
            // extra options for renaming
            // `rtti` or `literalsOf` here
        }]
    },
    "include": [
        //...
        // Integrate the def file for rtti.*:
        // Copy and tweak to your needs if you change
        // `namespace` or `literalsOf`.
        "./node_modules/typescript-transform-rtti/rtti.d.ts"
    ]
```

You can customize the transformer with the following options:

- `namespace?: string` -- Namespace to use for intrinsics, defaults to `"rtti"`.
- `literalsOf?: string` -- Function name for literals to detect, defaults to `"literalsOf"`.
