import { Router } from 'express';
import { WordsController } from './controllers/WordsController';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import { AuthSignIn } from './middleweres/AuthSignIn';
import { AuthToken } from './middleweres/AuthToken';
import { AuthSignUp } from './middleweres/AuthSignUp';
const routes = Router();
const wordsController = new WordsController();
const userController = new UserController();
const authController = new AuthController();


routes.get('/words', wordsController.query)
routes.get('/word/:id', wordsController.find)

routes.post('/addWord', AuthToken, wordsController.create);

routes.get('/editWord/:id', wordsController.find)
routes.post('/editWord', AuthToken, wordsController.update)

routes.post('/signUp', AuthSignUp, userController.signUp);

routes.post('/signIn', AuthSignIn, userController.signIn);

routes.get('/auth', AuthToken, authController.ok)

export { routes };