export interface ILogin {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password: string;
}

export interface ILoginService {
  getLogin(login: ILogin): Promise<string>
}

export interface ILoginModel {
  getLogin(email: string): Promise<ILogin>;
}
