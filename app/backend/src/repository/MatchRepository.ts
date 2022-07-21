import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchModel } from '../interface/Match';

export default class MatchRepository implements IMatchModel {
  constructor(private model = Match) {
    this.model = model;
  }

  public async getMatch(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }
}
