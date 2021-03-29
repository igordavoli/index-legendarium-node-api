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
    const { validUser } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const hash = await bcrypt.hash(validUser.password, 8)

    const user = userRepository.create({
      email: validUser.email,
      user_name: validUser.user_name,
      password: hash
    });

    await userRepository.save(user);

    const savedUser = await userRepository.findOneOrFail({ email: validUser.email });

    const userNameDB = savedUser.user_name

    const token = TokenGenerate(savedUser.id)

    res.status(201).json({ token, userNameDB });
  }

  /*
    |> SINGN IN
  */

  async signIn(req: Request, res: Response) {
    const { hasUser } = req.body;
    const token = TokenGenerate(hasUser.id)
    const userNameDB = hasUser.user_name;

    res.status(200).json({ token, userNameDB });
  }

  /*
    |> USERS PAGE
  */

  async userData(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const { id } = req.body.decoded;

    const user = await userRepository.findOneOrFail({ id });

    const userData = {
      email: user.email,
      user_name: user.user_name,
      created_at: user.created_at,
    }

    res.status(200).json({ userData })
  }

};

export { UserController };

