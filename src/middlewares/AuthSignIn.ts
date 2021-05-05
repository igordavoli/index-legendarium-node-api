import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { AppError } from '../errors/AppError';
import bcrypt from 'bcryptjs';

const AuthSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const userService = new UserService;
  const hasUser = await userService.findOneByEmail(email);

  if (!hasUser) {
    throw new AppError('User not found!', 422);
  }
  console.log(hasUser)

  const isPasswordCorrect = await bcrypt.compare(password, hasUser.password);

  if (!isPasswordCorrect) {
    throw new AppError('Wrong password!', 401);
  }

  req.body.user = hasUser;

  return next();
}

export { AuthSignIn };