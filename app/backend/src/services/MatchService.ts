import { IMatch, IMatchModel } from '../interface/Match';

export default class MatchService implements IMatchModel {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  public async getMatch():Promise<IMatch[]> {
    const matches = await this.model.getMatch();
    return matches;
  }

  public async matchInProgress(match:IMatch):Promise<IMatch> {
    // const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;
    // const scoreboard = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true };

    const inProgress = await this.model.matchInProgress(match);
    return inProgress;
  }
}
