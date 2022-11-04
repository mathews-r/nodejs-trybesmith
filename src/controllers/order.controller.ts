import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  async findAll(_req: Request, res: Response): Promise<void> {
    const result = await this.orderService.findAll();
    res.status(200).json(result);
  }
}
