declare type __ = { __isPlaceholder__: true };

// https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/33628
declare namespace Curry {
    type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> = T1[Position<I>] extends __
        ? Append<T2[Position<I>], TN>
        : TN;

    type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = {
        0: GapsOf<T1, T2, GapOf<T1, T2, TN, I> extends infer G ? Cast<G, any[]> : never, Next<I>>;
        1: Concat<TN, Drop<Position<I>, T2> extends infer D ? Cast<D, any[]> : never>;
    }[Position<I> extends Length<T1> ? 1 : 0];

    type PartialGaps<T extends any[]> = {
        [K in keyof T]?: T[K] | __;
    };

    type CleanedGaps<T extends any[]> = {
        [K in keyof T]: NonNullable<T[K]>;
    };

    type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>;

    type Curry<F extends (...args: any) => any> = <T extends any[]>(
        ...args: Cast<Cast<T, Gaps<Parameters<F>>>, any[]>
    ) => GapsOf<T, Parameters<F>> extends [any, ...any[]]
        ? Curry<(...args: GapsOf<T, Parameters<F>> extends infer G ? Cast<G, any[]> : never) => ReturnType<F>>
        : ReturnType<F>;
}

declare function curry<F extends (...args: any) => any>(f: F): Curry.Curry<F>;
