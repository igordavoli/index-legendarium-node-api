import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const AppErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.errorMessage });
  }
  console.log(error)
  return res
    .status(500)
    .json({ message: `Internal server error ${error}` })
}
