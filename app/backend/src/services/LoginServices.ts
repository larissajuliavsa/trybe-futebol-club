import { ILogin, ILoginService, ILoginModel } from '../interface/Login';
import Token from '../utils/Token';
import Bcrypt from '../utils/Bcrypt';

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
    const loginToken = this.token.getToken(data);

    return loginToken;
  }
}
