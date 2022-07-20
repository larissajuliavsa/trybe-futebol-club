import Team from '../database/models/Team';
import { ITeam, ITeamModel } from '../interface/Team';

export default class TeamRepository implements ITeamModel {
  constructor(private model = Team) {
    this.model = model;
  }

  public async getTeam(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data as ITeam[];
  }

  public async getTeamId(id: number): Promise<ITeam> {
    const dataId = await this.model.findByPk(id);
    return dataId as ITeam;
  }
}
