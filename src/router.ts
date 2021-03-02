import { Router } from 'express';
import WordsController from './controllers/WordsController'

const routes = Router();

routes.post("/addWord", WordsController.create);

export { routes };