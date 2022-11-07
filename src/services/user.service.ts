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

  public async login(username: string, password: string) {
    const [result] = await this.userModel.login(username, password);

    if (result !== undefined) {
      const token = this.jwt.sign(
        { id: result.id, username },
        process.env.JWT_SECRET as string,
        { algorithm: 'HS256', expiresIn: '1d' },
      );
      return { type: 200, message: token };
    }
    return { type: 401, message: 'Username or password invalid' };
  }
}
