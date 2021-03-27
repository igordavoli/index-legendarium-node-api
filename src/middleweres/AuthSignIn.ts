import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

const AuthSignIn = async (req: Request, res: Response, next: () => void) => {
  const { email, password } = req.body;

  const userRepository = getCustomRepository(UserRepository);

  const hasUser = await userRepository.findOne({ email });


  if (!hasUser) {
    return res.status(200).json({ message: 'User not finded!' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, hasUser.password);

  if (!isPasswordCorrect) {
    return res.status(200).json({ message: 'Wrong password!' });
  }

  req.body.hasUser = hasUser;

  return next();
}

export { AuthSignIn };