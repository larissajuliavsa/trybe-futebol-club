import { IMatch, IMatchModel } from '../interface/Match';

export default class MatchService implements IMatchModel {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  public async getMatch():Promise<IMatch[]> {
    const matches = await this.model.getMatch();
    return matches;
  }

  public async matchStarted(match:IMatch):Promise<IMatch> {
    const inProgress = await this.model.matchStarted({ ...match, inProgress: true });
    return inProgress;
  }

  public async matchFinished(id:number):Promise<object> {
    await this.model.matchFinished(id);
    return { message: 'Finished' };
  }
}
