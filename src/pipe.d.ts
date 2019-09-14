declare namespace Pipe {
    type Args<A extends any[], R extends any[], FN extends ((...args: any) => any)[] = [], I extends any[] = []> = {
        0: Args<A, R, Append<(...args: A) => R[Position<I>], FN> extends infer F ? Cast<F, any[]> : never, Next<I>>;
        1: Args<
            A,
            R,
            Append<(arg: R[Position<Previous<I>>]) => R[Position<I>], FN> extends infer F ? Cast<F, any[]> : never,
            Next<I>
        >;
        2: FN;
    }[Position<FN> extends Length<[]> ? 0 : Position<I> extends Length<R> ? 2 : 1];
}

declare function pipe<A extends any[], R extends any[]>(
    ...args: Pipe.Args<A, R> extends infer F ? Cast<F, any[]> : never[]
): ReturnType<
    (Pipe.Args<A, R> extends infer F ? Cast<F, any[]> : never[])[Length<
        Previous<Pipe.Args<A, R> extends infer F ? Cast<F, any[]> : never[]>
    >]
>;
