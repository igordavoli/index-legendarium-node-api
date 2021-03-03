import { Router } from 'express';
import WordsController from './controllers/WordsController'

const routes = Router();

routes.get('/words', WordsController.query)
routes.post("/addWord", WordsController.save);
routes.post('/editWord', WordsController.edit)

export { routes };