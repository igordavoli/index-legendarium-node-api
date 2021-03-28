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

    const token = TokenGenerate(savedUser.id)

    console.log(token)

    res.status(201).json({ token });
  }

  /*
    |> SINGN IN
  */

  async signIn(req: Request, res: Response) {
    const { hasUser } = req.body;
    const token = TokenGenerate(hasUser.id)

    res.status(200).json({ token });
  }
};

export { UserController };

 // const userData = {
    //   email: savedUser.email,
    //   user_name: savedUser.user_name,
    //   created_at: savedUser.created_at,
    // };