import { Request, Response, NextFunction } from "express";
//NOTE: all anonymous callback passed to this function(asyncWrapper) must be async, else an error is triggered.
function asyncWrapper(
  fn: (req: Request, res: Response, next: NextFunction) => any
) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}

export default asyncWrapper;
