import { Request, Response } from 'express';
import { IHomeBoardModel } from '../interface/HomeBoard';

export default class LeaderboardController {
  constructor(private service: IHomeBoardModel) {
    this.service = service;
  }

  public async getHomeBoard(_req: Request, res: Response) {
    const data = await this.service.getHomeBoard();
    return res.status(200).json(data);
  }

  public async getAwayBoard(_req: Request, res: Response) {
    const data = await this.service.getAwayBoard();
    return res.status(200).json(data);
  }

  public async getBoard(_req: Request, res: Response) {
    const data = await this.service.getBoard();
    return res.status(200).json(data);
  }
}
