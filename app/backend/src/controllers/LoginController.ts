import { Request, Response, NextFunction } from 'express';
import { ILoginService } from '../interface/Login';

export default class LoginController {
  constructor(private service: ILoginService) {
    this.service = service;
  }

  public async getLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.getLogin(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
