import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errObj = {
    msg: err.message || `Internal Server Error`,
    errorCode: err.statusCode || 500,
  };
  if (err.name === "ValidationError") {
    errObj.msg = err.details[0].message;
  }
  res
    .status(errObj.errorCode || 500)
    .json({
      success: false,
      msg: errObj.msg || `Internal Server Error. Try again later.`,
    });
}

export default errorHandler;
