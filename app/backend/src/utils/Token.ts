import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interface/Login';
import { IToken } from '../interface/Token';
import 'dotenv/config';

export default class Token {
  public getToken = (loginData:ILogin):string => {
    const jwtConfig:object = {
      expiresIn: '30d',
      algorithm: 'HS256',
    };

    const secret = process.env.JWT_SECRET || 'jwt_secret'; // pegar senha do .env
    const token = jwt.sign({ email: loginData.email, role: loginData.role }, secret, jwtConfig);
    return token;
  };

  public getAuth = (auth:string) => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const decode = jwt.verify(auth, secret);
    return decode as IToken;
  };
}
