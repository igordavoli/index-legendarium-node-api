import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError';

const AuthSignIn = async (req: Request, res: Response, next: () => void) => {
  const { email, password } = req.body;

  const userRepository = getCustomRepository(UserRepository);

  const hasUser = await userRepository.findOne({ email });


  if (!hasUser) {
    throw new AppError('User not finded!', 200);
  }

  const isPasswordCorrect = await bcrypt.compare(password, hasUser.password);

  if (!isPasswordCorrect) {
    throw new AppError('Wrong password!', 200);
  }

  req.body.hasUser = hasUser;

  return next();
}

export { AuthSignIn };