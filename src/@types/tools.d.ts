declare type Key = string | number | symbol;

declare type Func<P extends any[] = any, R extends any = any> = (...args: P) => R;

declare type Cast<X, Y> = X extends Y ? X : Y;

declare type Length<T extends any[]> = T['length'];

declare type First<T extends any[]> = T[0];

declare type Last<T extends any[]> = T[Length<Tail<T>>];

declare type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;

declare type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : [];

declare type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T;

declare type Position<I extends any[]> = Length<I>;

declare type Next<I extends any[]> = Prepend<any, I>;

declare type Previous<I extends any[]> = Tail<I>;

declare type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Reverse<T, Prepend<T[Position<I>], R>, Next<I>>;
    1: R;
}[Position<I> extends Length<T> ? 1 : 0];

declare type Concat<T1 extends any[], T2 extends any[]> = Reverse<
    Reverse<T1> extends infer R ? Cast<R, any[]> : never,
    T2
>;

declare type Append<E, T extends any[]> = Concat<T, [E]>;

declare type Drop<N extends number, T extends any[], I extends any[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, I>>;
    1: T;
}[Length<I> extends N ? 1 : 0];

declare type ReturnTypeStream<FN extends ((...args: any) => any)[], From extends any[] = [], I extends any[] = []> = {
    0: ReturnTypeStream<
        FN,
        Append<ReturnType<FN[Position<I>]>, From> extends infer F ? Cast<F, any[]> : never,
        Next<I>
    >;
    1: From;
}[Position<I> extends Length<FN> ? 1 : 0];
