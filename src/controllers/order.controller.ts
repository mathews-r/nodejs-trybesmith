import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  async findAll(_req: Request, res: Response): Promise<void> {
    const result = await this.orderService.findAll();
    res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { productsIds } = req.body;
    const { authorization: token } = req.headers;
    
    const { id } = await this.orderService.createOrder(productsIds, token as string);

    res.status(201).json({ userId: id, productsIds });
  }
}
