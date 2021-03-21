import { Router } from 'express';
import { WordsController } from './controllers/WordsController';
import { UserController } from './controllers/UserController';

const routes = Router();
const wordsController = new WordsController();
const userController = new UserController();

routes.get('/words', wordsController.query)
routes.get('/word/:id', wordsController.find)

routes.post('/addWord', wordsController.create);

routes.get('/editWord/:id', wordsController.find)
routes.post('/editWord', wordsController.update)

routes.post('/singnUp', userController.singnUp);
routes.post('/singnIn', userController.singnIn);

export { routes };