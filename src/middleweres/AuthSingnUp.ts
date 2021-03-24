import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

const AuthSingnUp = async (req: Request, res: Response, next: () => void) => {
  const { newUser } = req.body;

  const newUserAuth = {
    email: newUser.email.trim(),
    user_name: newUser.user_name.trim(),
    password: newUser.password.trim(),
  }

  const userRepository = getCustomRepository(UserRepository);

  const hasEmail = await userRepository.findOne({ email: newUserAuth.email });

  if (hasEmail) {
    return res.status(200).json({ message: 'Email already registered!' });
  }

  const hasUserName = await userRepository.findOne({ user_name: newUserAuth.user_name });

  if (hasUserName) {
    return res.status(200).json({ message: 'User name already exists!' });
  }

  req.body.newUserAuth = newUserAuth;

  return next();
}

export { AuthSingnUp };