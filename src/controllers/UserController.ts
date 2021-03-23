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
    const { user } = req.body;
    const token = TokenGenerate(user.id)

    res.status(200).json({ user, token });
  }
};

export { UserController };
