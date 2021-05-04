import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

import bcrypt from 'bcryptjs';

interface IUser {
  email: string;
  userName: string;
  password: string;
}

class UserService {
  async create(user: IUser) {
    const userRepository = getCustomRepository(UserRepository);
    const hash = await bcrypt.hash(user.password, 8)

    const newUser = userRepository.create({
      email: user.email,
      userName: user.userName,
      password: hash,
    });

    const savedUser = await userRepository.save(newUser);

    return savedUser;
  }
  async findOneOrFail(id: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneOrFail({ id });
    const userData = {
      email: user.email,
      userName: user.userName,
      createdAt: user.createdAt,
    };

    return userData;
  }
}

export { UserService };

  // isDeleted: 0,
  // question0: 0,
  // question1: 0,
  // question2: 0,
  // answer0: 'test',
  // answer1: 'test',
  // answer2: 'test',