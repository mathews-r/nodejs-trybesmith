import { RowDataPacket } from 'mysql2';
import { IOrders } from '../interfaces/Orders';
import mysql from './connection';

export default class OrderModel {
  private connection = mysql;

  public async findAll(): Promise<IOrders[]> {
    const [result] = await this.connection.execute<IOrders[] & RowDataPacket[]>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds FROM Trybesmith.Orders as o
      INNER JOIN Trybesmith.Products as p
      ON o.id = p.orderId
      GROUP BY p.orderId;`,
    );

    return result;
  }
}