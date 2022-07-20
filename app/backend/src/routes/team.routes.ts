import * as express from 'express';
import TeamRepository from '../repository/TeamRepository';
import TeamService from '../services/TeamServices';
import TeamController from '../controllers/TeamController';

const teamRouter = express.Router();

const entityFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);
  return controller;
};

teamRouter.get('/', (req, res) =>
  entityFactory().getTeam(req, res));

export default teamRouter;
