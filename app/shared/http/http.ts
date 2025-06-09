export type Result<T> = [T, null] | [null, Error];
export type HttpCollection<T> = { result: T[] };
