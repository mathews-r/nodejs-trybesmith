import { ResultSetHeader, RowDataPacket } from 'mysql2';
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

  public async findAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<IProduct[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products',
    );

    return result;
  }

  public async insert(order: number, product: number): Promise<boolean> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [order, product],
    );
    if (result.affectedRows > 0) {
      return true;
    }
    
    return false;
  }
}