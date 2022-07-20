import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  public compare = (password: string, hash: string):Promise<boolean> => {
    const crypt = bcrypt.compare(password, hash);
    return crypt;
  };
}
