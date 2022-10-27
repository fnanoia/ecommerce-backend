import { Request, Response, NextFunction } from "express";

export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  const { isAdmin } = req.body;

  if (isAdmin === true) {
    return next();
  } else {
    return res.status(403).send("Unauthorized");
  }
};
