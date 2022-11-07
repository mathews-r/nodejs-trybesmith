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

  async createOrder(userId: number, products: number[]): Promise<IOrders> {
    const insertOrder = await this.orderModel.createOrder(userId);
    const insertProducts = products.map(async (product) => {
      await this.productModel.insert(insertOrder, product);
    });

    await Promise.all(insertProducts);
    return { userId };
  }
}