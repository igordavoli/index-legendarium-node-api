import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { TokenGenerate } from '../utils/JWT'

class UserController {
  /* 
    |> SINGNUP
  */

  async signUp(req: Request, res: Response) {
    const { newUserAuth } = req.body;

    const userRepository = getCustomRepository(UserRepository);

    const hash = await bcrypt.hash(newUserAuth.password, 8)

    const user = userRepository.create({
      email: newUserAuth.email,
      user_name: newUserAuth.user_name,
      password: hash
    });

    await userRepository.save(user);

    const savedUser = await userRepository.findOneOrFail({ email: newUserAuth.email });

    const userData = {
      email: savedUser.email,
      user_name: savedUser.user_name,
      created_at: savedUser.created_at,
    };

    const token = TokenGenerate(savedUser.id)

    res.status(201).json({ userData, token });
  }

  /*
    |> SINGN IN
  */

  async signIn(req: Request, res: Response) {
    const { userData } = req.body;
    const token = TokenGenerate(userData.id)

    res.status(200).json({ userData, token });
  }
};

export { UserController };
