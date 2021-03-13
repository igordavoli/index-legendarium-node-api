import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { email, user_name, password } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const hasEmail = await userRepository.findOne({ email });
    const hasUserName = await userRepository.findOne({ user_name });

    if (hasEmail) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    if (hasUserName) {
      return res.status(400).json({ message: 'User name already exists!' });
    }

    const newUser = userRepository.create({
      email,
      user_name,
      password
    });

    await userRepository.save(newUser);

    const savedUser = await userRepository.findOne({ email });

    res.status(201).json(savedUser);

  }
};

export { UserController };
