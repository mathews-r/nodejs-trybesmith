import jwt from 'jsonwebtoken';
import { IOrders } from '../interfaces/Orders';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';

export default class OrderService {
  constructor(
    private orderModel = new OrderModel(),
    private productModel = new ProductModel(),
  ) { }

  async findAll(): Promise<IOrders[]> {
    const result = await this.orderModel.findAll();

    return result;
  }

  async createOrder(products: number[], token: string): Promise<IOrders> {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    const { id } = decoded as { id: number };

    const insertOrder = await this.orderModel.createOrder(id);

    const insertProducts = products.map(async (product) => {
      await this.productModel.insert(insertOrder, product);
    });

    await Promise.all(insertProducts);
    return { id };
  }
}