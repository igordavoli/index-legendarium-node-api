import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const AuthToken = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(200).json({ error: 'No token Provided!' });
  }

  const authHeaderParts = authHeader.split(' ');

  if (authHeaderParts.length !== 2) {
    return res.status(200).json({ error: 'Token misformated!' });
  }

  const [scheme, token] = authHeaderParts;

  if (!/Bearer$/i.test(scheme)) {
    return res.status(200).json({ error: 'Token error' });
  }

  const secret = String(process.env.SECRET);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(200).json({ error: 'Invalid tolken!' });
    }

    req.body.decoded = decoded;

    return next();
  });
}

export { AuthToken };