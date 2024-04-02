import { Request, Response, NextFunction } from "express";
function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).send(`<h2><i>PAGE NOT FOUND</i></h2>`);
}

export default notFound;
