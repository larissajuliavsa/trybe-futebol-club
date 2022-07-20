import { Request, Response } from 'express';
import { ITeamModel } from '../interface/Team';

export default class TeamController {
  constructor(private service: ITeamModel) {
    this.service = service;
  }

  public async getTeam(_req: Request, res: Response) {
    const data = await this.service.getTeam();
    return res.status(200).json(data);
  }
}
