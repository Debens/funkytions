declare namespace Path {
    type At<O, K extends Key> = K extends keyof O ? O[K] : never;

    type Options<O, Path extends Key[] = [], I extends any[] = []> = {
        0: Union.toTuple<keyof O> extends [any] ? Union.toTuple<keyof O> : never;
        1: Options<At<O, Path[Position<I>]>, Path, Next<I>>;
    }[Position<I> extends Length<Path> ? 0 : 1];

    type Value<O, Path extends Key[] = [], I extends any[] = []> = {
        0: O;
        1: Value<At<O, Path[Position<I>]>, Path, Next<I>>;
    }[Position<I> extends Length<Path> ? 0 : 1];
}

declare function path<O, Path extends Key[]>(o: O, ...path: Path): Path.Value<O, Path>;
