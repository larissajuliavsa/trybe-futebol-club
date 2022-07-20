import { Request, Response, NextFunction } from 'express';
import Token from '../utils/Token';
import { ILoginService } from '../interface/Login';

const NOT_FOUND = 'Token Not Found';
const UNAUTHORIZED = 401;

export default class LoginController {
  jwt: Token;

  constructor(private service: ILoginService) {
    this.service = service;
    this.jwt = new Token();
  }

  public async getLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.getLogin(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  public getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) next({ status: UNAUTHORIZED, message: NOT_FOUND });

      if (typeof authorization === 'string') {
        const { role } = await this.jwt.getAuth(authorization);
        return res.status(200).json({ role });
      }
    } catch (error) {
      next({ status: UNAUTHORIZED, message: NOT_FOUND });
    }
  };
}
