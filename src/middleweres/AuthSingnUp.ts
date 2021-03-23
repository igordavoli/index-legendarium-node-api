import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

const AuthSingnUp = async (req: Request, res: Response, next: () => void) => {
  const { email, user_name } = req.body;
  const userRepository = getCustomRepository(UserRepository);

  const hasEmail = await userRepository.findOne({ email });

  if (hasEmail) {
    return res.status(200).json({ message: 'Email already registered!' });
  }

  const hasUserName = await userRepository.findOne({ user_name });

  if (hasUserName) {
    return res.status(200).json({ message: 'User name already exists!' });
  }

  return next();
}

export { AuthSingnUp };