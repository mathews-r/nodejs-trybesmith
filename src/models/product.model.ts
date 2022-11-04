import { ResultSetHeader } from 'mysql2';
import { IProduct } from '../interfaces/Products';
import mysql from './connection';

export default class ProductModel {
  private connection = mysql;

  public async create(name: string, amount: string): Promise<IProduct> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products(name, amount) VALUES(?, ?)',
      [name, amount],
    );

    const newProduct = {
      id: insertId,
      name,
      amount,
    };

    return newProduct;
  }
}