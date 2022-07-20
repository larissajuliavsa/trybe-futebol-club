import User from '../database/models/User';
import { ILogin, ILoginModel } from '../interface/Login';

export default class LoginRepository implements ILoginModel {
  constructor(private model = User) {
    this.model = model;
  }

  public async getLogin(email: string): Promise<ILogin> {
    const login = await this.model.findOne({ where: { email } });
    return login as ILogin;
  }
}
