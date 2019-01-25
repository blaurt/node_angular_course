export function withAsync(fn: Function) {
  return (req: Express.Request, res: Express.Response, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
