import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

const AuthSingnin = async (req: Request, res: Response, next: () => void) => {
  const { email, password } = req.body;
  const userRepository = getCustomRepository(UserRepository);
  const hasUser = await userRepository.findOneOrFail({ email });

  if (!hasUser) {
    return res.status(200).json({ message: 'User not finded!' });
  }

  const user = {
    id: hasUser.id,
    email: hasUser.email,
    user_name: hasUser.user_name,
    created_at: hasUser.created_at,
  };

  const isPasswordCorrect = await bcrypt.compare(password, hasUser.password);

  if (!isPasswordCorrect) {
    return res.status(200).json({ message: 'Wrong password!' });
  }

  req.body.user = user;

  return next()
}

export { AuthSingnin };