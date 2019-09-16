declare namespace Union {
    type IntersectOf<U extends any> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void)
        ? I
        : never;

    type Last<U extends any> = IntersectOf<U extends unknown ? (x: U) => void : never> extends (x: infer P) => void
        ? P
        : never;

    type toTuple<U, T extends any[] = [], L = Last<U>> = {
        0: toTuple<Exclude<U, L>, Prepend<L, T>>;
        1: T;
    }[[U] extends [never] ? 1 : 0];
}
