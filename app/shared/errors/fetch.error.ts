export class FetchError extends Error {
  res: Response;
  constructor(res: Response, message?: string) {
    super(message);
    this.res = res;
  }
}
