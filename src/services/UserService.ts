import { getCustomRepository, Repository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";

interface IUser {
  email: string;
  userName: string;
  password: string;
}

class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = getCustomRepository(UserRepository);
  }

  async create(userData: IUser) {

    const newUser = this.repository.create(userData);
    const user = await this.repository.save(newUser);

    return user;
  }

  async findOneByEmail(email: string) {

    const user = await this.repository.findOne({ email });

    return user;
  }

  async findOneByIdOrFail(id: string) {

    const user = await this.repository.findOneOrFail({ id });
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