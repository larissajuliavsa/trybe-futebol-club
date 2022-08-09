import * as express from 'express';
import MatchRepository from '../repository/MatchRepository';
import TeamRepository from '../repository/TeamRepository';
import LeaderboardService from '../services/LeaderBoardServices';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = express.Router();

const entityFactory = () => {
  const matchRepository = new MatchRepository();
  const teamRepository = new TeamRepository();
  const service = new LeaderboardService(matchRepository, teamRepository);
  const controller = new LeaderboardController(service);
  return controller;
};

leaderboardRouter.get('/home', (req, res) =>
  entityFactory().getHomeBoard(req, res));

export default leaderboardRouter;
