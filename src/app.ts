import express from 'express';
import createConnection from './database';
import { routes } from './router'

createConnection();

const app = express();

app.use(express.json())
app.use(routes);

export { app };