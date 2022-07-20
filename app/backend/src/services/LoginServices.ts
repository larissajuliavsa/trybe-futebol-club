// import { Request, Response, NextFunction } from 'express';
import { ILogin, ILoginService, ILoginModel } from '../interface/Login';
import Token from '../utils/Token';
import Bcrypt from '../utils/Bcrypt';

// const MSG_NULL = 'All fields must be filled';
// const MSG_INCORRECT = 'Incorrect email or password';
// const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;

export default class LoginService implements ILoginService {
  token: Token;
  bcrypt: Bcrypt;

  constructor(private model: ILoginModel) {
    this.model = model;
    this.bcrypt = new Bcrypt();
    this.token = new Token();
  }

  public async getLogin(login: ILogin):Promise<string> {
    const data = await this.model.getLogin(login.email);
    // if (!data) throw new Error('Sorry, I didnt find it');

    // await this.bcrypt.compare(login.password, data.password);
    // if (!crypt) throw new Error('Sorry, I didnt find it');

    const loginToken = this.token.getToken(data);
    return loginToken;
  }
}
