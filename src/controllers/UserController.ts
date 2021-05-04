import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { TokenGenerate } from '../utils/JWT'

class UserController {

  async signUp(req: Request, res: Response) {

    const { validUser } = req.body;
    const userService = new UserService;
    const user = await userService.create(validUser);
    const token = TokenGenerate(user.id)

    res.status(201).json({ token, user });
  }

  async signIn(req: Request, res: Response) {

    const { hasUser } = req.body;
    const token = TokenGenerate(hasUser.id)
    const user = hasUser;

    res.status(200).json({ token, user });
  }

  async userData(req: Request, res: Response) {

    const { id } = req.body.decoded;
    const userService = new UserService;
    const userData = await userService.findOneOrFail(id);

    res.status(200).json({ userData })
  }

};

export { UserController };

