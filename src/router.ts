import { Router } from 'express';
import { WordsController } from './controllers/WordsController';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController'
import { AuthToken } from './middleweres/AuthToken'
const routes = Router();
const wordsController = new WordsController();
const userController = new UserController();
const authController = new AuthController();


routes.get('/words', wordsController.query)
routes.get('/word/:id', wordsController.find)

routes.post('/addWord', AuthToken, wordsController.create);

routes.get('/editWord/:id', wordsController.find)
routes.post('/editWord', AuthToken, wordsController.update)

routes.post('/singnUp', userController.singnUp);
routes.post('/singnIn', userController.singnIn);

routes.get('/auth', AuthToken, authController.ok)

export { routes };