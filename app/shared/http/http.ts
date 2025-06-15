export type Result<T> = [T, null] | [null, Error];
export type NextHttpResult<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
export type HttpCollection<T> = { results: T[] };
