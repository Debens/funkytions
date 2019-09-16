const obj = { a: { b: 1 }, c: 0 };

type value_1 = Path.Value<typeof obj, ['a']>;
type value_2 = Path.Value<typeof obj, ['c']>;
type value_3 = Path.Value<typeof obj, ['d']>;

type path_1 = Path.Options<typeof obj, ['a']>;
type path_2 = Path.Options<typeof obj, ['c']>;
type path_3 = Path.Options<typeof obj, ['d']>;

const test_1 = path(obj, 'a', 'b');
