import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';


interface Decoded {
  id: string;
  exp: number
}



const AuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('No token Provided!', 200);
  }

  const authHeaderParts = authHeader.split(' ');

  if (authHeaderParts.length !== 2) {
    throw new AppError('Token misformated!', 200);
  }

  const [scheme, token] = authHeaderParts;

  if (!/Bearer$/i.test(scheme)) {
    throw new AppError('Token error', 200);
  }

  const secret = String(process.env.SECRET);

  let decoded;

  try {
    decoded = jwt.verify(token, secret,);

  } catch (error) {
    throw new AppError(`Invalid tolken! ${error}`, 200);
  }

  req.body.decoded = decoded;

  return next();
}

export { AuthToken };