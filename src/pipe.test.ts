type TestRequiredFunctions = Pipe.Args<[string, number], [string, number, boolean]>;

type top = (name: string, age: number) => string;
type bottom = (name: string) => boolean;

type stream = ReturnTypeStream<[top, bottom]>;

const f1 = (_: string, __: number) => true;
const f2 = (_: boolean) => 10;

// Types cannot be infered
pipe<[string, number], [boolean, number]>(
    f1,
    f2,
);
