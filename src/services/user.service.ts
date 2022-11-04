import jsonwebtoken from 'jsonwebtoken';
import UsersModel from '../models/users.model';

export default class UserService {
  constructor(private userModel = new UsersModel()) { }

  public jwt = jsonwebtoken;

  public async generateToken(username: string, classe: string, level: number, password: string) {
    const userId = await this.userModel.create(username, classe, level, password);

    const payload = { userId, username, classe, level }; 
    return this.jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  }
}
