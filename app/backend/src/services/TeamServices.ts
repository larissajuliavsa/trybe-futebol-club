import { ITeam, ITeamModel } from '../interface/Team';

export default class TeamService implements ITeamModel {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  public async getTeam():Promise<ITeam[]> {
    const data = await this.model.getTeam();
    return data;
  }
}
