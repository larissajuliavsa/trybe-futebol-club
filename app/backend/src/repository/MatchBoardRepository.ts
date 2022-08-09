import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../interface/Match';
import { IMatchBoardModel } from '../interface/MatchBoard';

export default class MatchBoardRepository implements IMatchBoardModel {
  constructor(private model = Match) {
    this.model = model;
  }

  public async getMatch(inProgress: null | boolean): Promise<IMatch[]> {
    let matches;
    if (inProgress === null) {
      matches = await this.model.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    } else {
      matches = await this.model.findAll({ where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    }
    return matches;
  }
}
