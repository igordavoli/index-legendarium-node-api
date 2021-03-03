import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { email, user_name, password } = req.body;

    const userRepository = getCustomRepository(UserRepository);

    const hasEmail = await userRepository.findOne({ email });

    if (hasEmail) {
      return res.status(400).json({ Error: 'Email already exists!' });
    }

    const hasUserName = await userRepository.findOne({ user_name });

    if (hasUserName) {
      return res.status(400).json({ Error: 'User name already exists!' });
    }

    const newUser = userRepository.create({
      email,
      user_name,
      password
    });

    await userRepository.save(newUser);

    const userSaved = await userRepository.findOne({ email });

    res.status(200).json(userSaved);

  }
};

export { UserController };
