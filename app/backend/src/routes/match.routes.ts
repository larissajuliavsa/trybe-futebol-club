import * as express from 'express';
import MatchRepository from '../repository/MatchRepository';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const matchRouter = express.Router();

const entityFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchService(repository);
  const controller = new MatchController(service);
  return controller;
};

matchRouter.get('/', (req, res) =>
  entityFactory().getMatch(req, res));

export default matchRouter;
