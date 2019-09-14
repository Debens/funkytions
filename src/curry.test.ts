const __: __ = { __isPlaceholder__: true };

const func = (name: string, age: number, isSomething: boolean) => true;

const curried = curry(func);

curried('Andrew', __)(25, true);
curried('Andrew', __, true)(25);
