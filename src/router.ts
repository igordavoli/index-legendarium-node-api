import { Router } from 'express';
import { WordsController } from './controllers/WordsController';
import { UserController } from './controllers/UserController';

const routes = Router();
const wordsController = new WordsController();
const userController = new UserController();

routes.get('/words', wordsController.query)
routes.post('/addWord', wordsController.create);
routes.post('/editWord', wordsController.update)

routes.post('/addUser', userController.create)

export { routes };