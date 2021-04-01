import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/UserRepository';

const AuthSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { newUser } = req.body;

  const newUserAuth = {
    email: newUser.email.trim(),
    user_name: newUser.user_name.trim(),
    password: newUser.password.trim(),
  }

  const userRepository = getCustomRepository(UserRepository);

  const hasEmail = await userRepository.findOne({ email: newUserAuth.email });

  if (hasEmail) {
    throw new AppError('Email already registered!', 200);
  }

  const hasUserName = await userRepository.findOne({ user_name: newUserAuth.user_name });

  if (hasUserName) {
    throw new AppError('User name already exists!', 200);
  }

  req.body.validUser = newUserAuth;

  return next();
}

export { AuthSignUp };