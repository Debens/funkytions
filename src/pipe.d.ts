declare namespace Pipe {
    type Args<Fns extends Func[]> = {
        [K in keyof Fns]: Item<Fns, K>;
    };

    type Item<Fns extends Func[], K extends keyof Fns> = {
        0: Fns[K];
        1: (
            arg: ReturnType<Fns[Position<Previous<IteratorOf<K & string>>>]>,
        ) => ReturnType<Fns[Position<IteratorOf<K & string>>]>;
    }[K extends '0' ? 0 : 1];
}

declare function pipe<FN extends Func[]>(
    ...args: Pipe.Args<FN>
): (...args: Parameters<First<FN>>) => ReturnType<Last<FN>>;
