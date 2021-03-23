import { Request, Response } from 'express';

class AuthController {
  ok(req: Request, res: Response) {
    res.status(200).json({ OK: true, user: req.body.decoded })
  }
}

export { AuthController };