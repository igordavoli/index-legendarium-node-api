import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { routes } from './router'
import cors from 'cors';
import { AppError } from './errors/AppError';
const corsOptions = {
  origin: 'http://localhost:3000',
  Credentials: true,
  optionSuccessStatus: 200
}

createConnection();

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.errorMessage });
  }
  return res.status(500).json({ message: `Internal server error ${err.message}` })
})

export { app };