import { IProduct } from '../interfaces/Products';
import ProductModel from '../models/product.model';

export default class ProductService {
  constructor(private productModel = new ProductModel()) { }

  async create(name: string, amount: string): Promise<IProduct> {
    return this.productModel.create(name, amount);
  }
}