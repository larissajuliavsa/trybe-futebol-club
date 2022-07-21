import { IMatch, IMatchModel } from '../interface/Match';

export default class MatchService implements IMatchModel {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  public async getMatch():Promise<IMatch[]> {
    const matches = await this.model.getMatch();
    return matches;
  }
}