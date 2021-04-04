import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader === 'null') {
    throw new AppError('No token Provided!', 401);
  }

  const authHeaderParts = authHeader.split(' ');

  if (authHeaderParts.length !== 2) {
    throw new AppError('Token misformated!', 401);
  }

  const [scheme, token] = authHeaderParts;

  if (!/Bearer$/i.test(scheme)) {
    throw new AppError('Token error', 401);
  }

  const secret = String(process.env.SECRET);

  let decoded;

  try {
    decoded = jwt.verify(token, secret,);
  } catch (error) {
    throw new AppError(`Invalid tolken! ${error}`, 401);
  }

  req.body.decoded = decoded;

  return next();
}

export { AuthToken };