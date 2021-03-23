import jwt from 'jsonwebtoken';

function TokenGenerate(id: string) {
  const secret = String(process.env.SECRET);
  const token = jwt.sign({ id }, secret, { expiresIn: (86400 * 30) });
  return token;
}

export { TokenGenerate };