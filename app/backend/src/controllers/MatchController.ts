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

  public async matchStarted(req: Request, res: Response) {
    const { body } = req;
    const inProgress = await this.service.matchStarted(body);

    return res.status(201).json(inProgress);
  }

  public async matchFinished(req: Request, res: Response) {
    const { id } = req.params;
    const finished = await this.service.matchFinished(Number(id));

    return res.status(200).json(finished);
  }

  public async matchUpdated(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    console.log('log controller', body);

    const updated = await this.service.matchUpdated(Number(id), body);

    return res.status(200).json(updated);
  }
}
