import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private productControler = new UserService()) { }

  async create(req: Request, res: Response): Promise<void> {
    const { username, classe, level, password } = req.body;
    const token = await this.productControler.generateToken(username, classe, level, password);

    res.status(201).json({ token });
  }
}