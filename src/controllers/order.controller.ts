import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  async findAll(_req: Request, res: Response): Promise<void> {
    const result = await this.orderService.findAll();
    res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { productsIds } = req.body;
    console.log(req.body.user.userId);
    
    await this.orderService.createOrder(req.body.user.userId, productsIds);

    res.status(201).json({ userId: req.body.user.userId, productsIds });
  }
}
