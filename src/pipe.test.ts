const f1 = (name: string, age: number) => true;
const f2 = (other: boolean) => new Date();

type TestPipedArgs = Pipe.Args<[typeof f2, typeof f1]>;

const result = pipe(
    f1,
    f2,
)('nic', 25);
