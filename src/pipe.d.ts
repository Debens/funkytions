declare namespace Pipe {
    type Fns<F extends Func[], R extends Func[] = [], I extends any[] = []> = {
        0: Fns<F, Append<F[Position<I>], R> extends infer F ? Cast<F, any[]> : never, Next<I>>;
        1: Fns<
            F,
            Append<Connect<F[Position<Previous<I>>], F[Position<I>]>, R> extends infer F ? Cast<F, Func[]> : never,
            Next<I>
        >;
        2: Append<Connect<F[Position<Previous<I>>], F[Position<I>]>, R>;
    }[Position<R> extends Length<[]> ? 0 : Position<I> extends Length<R> ? 2 : 1];

    type Connect<Previous extends Func, Next extends Func> = (arg: ReturnType<Previous>) => ReturnType<Next>;

    type HeadArgs<FN extends Func[]> = Head<FN> extends infer H ? Parameters<Cast<H, Func>> : never;

    type PipedArgs<FN extends Func[], From extends any[] = [], I extends any[] = []> = {
        0: PipedArgs<FN, Append<ReturnType<FN[Position<I>]>, From> extends infer F ? Cast<F, any[]> : never, Next<I>>;
        1: From;
    }[Position<I> extends Length<FN> ? 1 : 0];
}

declare function pipe<FN extends Func[]>(
    ...args: Pipe.Fns<FN>
): (...args: Pipe.HeadArgs<FN>) => Head<Reverse<Pipe.PipedArgs<FN>>>;
