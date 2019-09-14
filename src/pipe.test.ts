const f1 = (name: string, age: number) => true;
const f2 = (other: boolean) => new Date();

type TestChain_Align = Pipe.Fns<[typeof f1, typeof f2]>;
type TestChain_Unaligned = Pipe.Fns<[typeof f2, typeof f1]>;

type TestHeadArgs = Pipe.HeadArgs<[typeof f1, typeof f2]>;

type TestPipedArgs = Pipe.PipedArgs<[typeof f2, typeof f1]>;

// FIXME: args cannot be infered backwards through generic `..args: Pipe.Fns<FN>`
const result = pipe<[typeof f1, typeof f2]>(
    f1,
    f2,
)('nic', 25);

/**
 * New Plan, "back 2 plan 1".
 *
 * 1. pipe args, `...args: FN`, must be the base, it cannot be built from generic params, which is annoying!
 * 2. We can then build the expected chain, and start aruguments
 * (3. Build expected FN and check they match ??!! )
 * 3. Wait for variadic kinds? -- https://github.com/microsoft/TypeScript/issues/5453
 */
