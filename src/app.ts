import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import createConnection from './database';
import { routes } from './router'
import cors from 'cors';
import { AppErrors } from './middleweres/Errors';

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   Credentials: true,
//   optionSuccessStatus: 200
// }

createConnection();

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);
app.use(AppErrors);

export { app };