import { Request, Response } from 'express';
import { IMatchModel } from '../interface/Match';

export default class MatchController {
  constructor(private service: IMatchModel) {
    this.service = service;
  }

  public async getMatch(_req: Request, res: Response) {
    const matches = await this.service.getMatch();
    return res.status(200).json(matches);
  }
}