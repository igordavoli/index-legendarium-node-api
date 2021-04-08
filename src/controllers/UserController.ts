import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { TokenGenerate } from '../utils/JWT'

class UserController {

  async signUp(req: Request, res: Response) {
    const { validUser } = req.body;
    const userRepository = getCustomRepository(UserRepository);
    const hash = await bcrypt.hash(validUser.password, 8)

    const user = userRepository.create({
      email: validUser.email,
      userName: validUser.userName,
      password: hash,
      // isDeleted: 0,
      // question0: 0,
      // question1: 0,
      // question2: 0,
      // answer0: 'test',
      // answer1: 'test',
      // answer2: 'test',
    });

    await userRepository.save(user);

    const savedUser = await userRepository.findOneOrFail({ email: validUser.email });

    const userNameDB = savedUser.userName

    const token = TokenGenerate(savedUser.id)

    res.status(201).json({ token, userNameDB });
  }

  async signIn(req: Request, res: Response) {
    const { hasUser } = req.body;
    const token = TokenGenerate(hasUser.id)
    const userNameDB = hasUser.userName;

    res.status(200).json({ token, userNameDB });
  }

  async userData(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const { id } = req.body.decoded;

    const user = await userRepository.findOneOrFail({ id });

    const userData = {
      email: user.email,
      userName: user.userName,
      createdAt: user.createdAt,
    }

    res.status(200).json({ userData })
  }

};

export { UserController };

