import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

class UserController {
  /* 
    |> SINGNUP
  */

  async singnUp(req: Request, res: Response) {
    const { email, user_name, password } = req.body;
    const userRepository = getCustomRepository(UserRepository);

    const hasEmail = await userRepository.findOne({ email });

    if (hasEmail) {
      return res.status(200).json({ message: 'User already exists!' });
    }

    const hasUserName = await userRepository.findOne({ user_name });

    if (hasUserName) {
      return res.status(200).json({ message: 'User name already exists!' });
    }

    const hash = await bcrypt.hash(password, 8)
    const newUser = userRepository.create({
      email,
      user_name,
      password: hash
    });

    await userRepository.save(newUser);

    const savedUser = await userRepository.findOne({ email });

    res.status(201).json(savedUser);
  }

  /*
    |> SINGN IN
  */


  async singnIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = getCustomRepository(UserRepository);

    const hasUser = await userRepository.findOne({ email });

    if (!hasUser) {
      return res.status(200).json({ message: 'User not finded!' });
    }

    const hashedPassword = hasUser.password;

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

    if (!isPasswordCorrect) {
      return res.status(200).json({ message: 'Wrong password!' })
    }

    res.status(200).json(hasUser);
  }
};

export { UserController };
