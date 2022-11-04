import { IOrders } from '../interfaces/Orders';
import OrderModel from '../models/order.model';

export default class OrderService {
  constructor(private orderModel = new OrderModel()) { }

  async findAll(): Promise<IOrders[]> {
    const result = await this.orderModel.findAll();

    return result;
  }
}