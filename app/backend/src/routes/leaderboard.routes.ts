import * as express from 'express';
import MatchBoardRepository from '../repository/MatchBoardRepository';
import TeamRepository from '../repository/TeamRepository';
import LeaderboardService from '../services/LeaderBoardServices';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = express.Router();

const entityFactory = () => {
  const matchRepository = new MatchBoardRepository();
  const teamRepository = new TeamRepository();
  const service = new LeaderboardService(matchRepository, teamRepository);
  const controller = new LeaderboardController(service);
  return controller;
};

leaderboardRouter.get('/', (req, res) =>
  entityFactory().getBoard(req, res));

leaderboardRouter.get('/home', (req, res) =>
  entityFactory().getHomeBoard(req, res));

leaderboardRouter.get('/away', (req, res) =>
  entityFactory().getAwayBoard(req, res));

export default leaderboardRouter;
