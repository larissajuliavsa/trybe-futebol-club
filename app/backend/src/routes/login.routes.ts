import * as express from 'express';
import LoginRepository from '../repository/LoginRepository';
import LoginService from '../services/LoginServices';
import LoginController from '../controllers/LoginController';
import {
  emailMiddleware,
  passwordMiddleware,
} from '../middleware/throwMiddleware';

const loginRouter = express.Router();

const entityFactory = () => {
  const repository = new LoginRepository();
  const service = new LoginService(repository);
  const controller = new LoginController(service);
  return controller;
};

loginRouter.post('/', emailMiddleware, passwordMiddleware, (req, res, next) =>
  entityFactory().getLogin(req, res, next));

loginRouter.get('/validate', (req, res, next) =>
  entityFactory().getToken(req, res, next));

export default loginRouter;
