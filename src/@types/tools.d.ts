type Func = (...args: any) => any;

type Cast<X, Y> = X extends Y ? X : Y;

type Length<T extends any[]> = T['length'];

type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : [];

type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T;

type Position<I extends any[]> = Length<I>;

type Next<I extends any[]> = Prepend<any, I>;

type Previous<I extends any[]> = Tail<I>;

type Iterate<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
    0: Iterate<Index, Next<From>, Next<I>>;
    1: From;
}[Position<I> extends Index ? 1 : 0];

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Reverse<T, Prepend<T[Position<I>], R>, Next<I>>;
    1: R;
}[Position<I> extends Length<T> ? 1 : 0];

type Concat<T1 extends any[], T2 extends any[]> = Reverse<Reverse<T1> extends infer R ? Cast<R, any[]> : never, T2>;

type Append<E, T extends any[]> = Concat<T, [E]>;

type Drop<N extends number, T extends any[], I extends any[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, I>>;
    1: T;
}[Length<I> extends N ? 1 : 0];

type ReturnTypeStream<FN extends ((...args: any) => any)[], From extends any[] = [], I extends any[] = []> = {
    0: ReturnTypeStream<
        FN,
        Append<ReturnType<FN[Position<I>]>, From> extends infer F ? Cast<F, any[]> : never,
        Next<I>
    >;
    1: From;
}[Position<I> extends Length<FN> ? 1 : 0];
