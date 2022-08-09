import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchModel } from '../interface/Match';

export default class MatchRepository implements IMatchModel {
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

  public async matchStarted(match:IMatch):Promise<IMatch> {
    const inProgress = await this.model.create(match);
    return inProgress;
  }

  public async matchFinished(id:number):Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async matchUpdated(id:number, body:object):Promise<void> {
    console.log('log repository', body);
    await this.model.update(body, { where: { id } });
  }
}
