import { Router } from 'express';
import { WordsController, UserController } from './controllers';
import { AuthSignIn, AuthToken, AuthSignUp } from './middlewares';

const routes = Router();
const wordsController = new WordsController();
const userController = new UserController();

routes.get('/words', wordsController.query)
routes.get('/word/:id', wordsController.find)

routes.post('/addWord', AuthToken, wordsController.create);

routes.get('/editWord/:id', wordsController.find)
routes.post('/editWord', AuthToken, wordsController.update)

routes.post('/signUp', AuthSignUp, userController.signUp);

routes.post('/signIn', AuthSignIn, userController.signIn);

routes.get('/user', AuthToken, userController.userData);


export { routes };