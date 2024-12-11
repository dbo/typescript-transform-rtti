# typescript-transform-rtti

This transformer emits runtime type information (RTTI) about typescript types.
Use it e.g. with [`ts-patch`](https://github.com/nonara/ts-patch).

There's currently just one intrinsic function that emits an array of values about literal unions and const enums, see [rtti.d.ts](./rtti.d.ts).

You can customize the transformer with the following options:

- `namespace?: string` -- Namespace to use for intrinsics, defaults to `"rtti"`. Adapt your `rtti.d.ts` accordingly when changing this.
- `literalsOf?: string` -- Function name for literals to detect, defaults to `"literalsOf"`. Adapt your `rtti.d.ts` accordingly when changing this.
