import { Request, Response } from 'express';

class AuthController {
  ok(req: Request, res: Response) {
    const { id } = req.body.decoded;
    res.status(200).json({ OK: true, user_id: id });
  }
}

export { AuthController };