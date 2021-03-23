import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { TokenGenerate } from '../utils/JWT'

class UserController {
  /* 
    |> SINGNUP
  */

  async singnUp(req: Request, res: Response) {
    const { email, user_name, password } = req.body;
    const userRepository = getCustomRepository(UserRepository);

    const hasEmail = await userRepository.findOne({ email });

    if (hasEmail) {
      return res.status(200).json({ message: 'Email already registered!' });
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

    const savedUser = await userRepository.findOneOrFail({ email });

    const user = {
      email: savedUser?.email,
      user_name: savedUser?.user_name,
      created_at: savedUser?.created_at,
    };

    const token = TokenGenerate(savedUser.id)

    res.status(201).json({ user, token });
  }

  /*
    |> SINGN IN
  */

  async singnIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const hasUser = await userRepository.findOneOrFail({ email });

    if (!hasUser) {
      return res.status(200).json({ message: 'User not finded!' });
    }

    const user = {
      email: hasUser.email,
      user_name: hasUser.user_name,
      created_at: hasUser.created_at,
    };

    const isPasswordCorrect = await bcrypt.compare(password, hasUser.password);

    if (!isPasswordCorrect) {
      return res.status(200).json({ message: 'Wrong password!' });
    }

    const token = TokenGenerate(hasUser.id)

    res.status(200).json({ user, token });
  }
};

export { UserController };
