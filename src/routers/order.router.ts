import express from 'express';
import OrderController from '../controllers/order.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { orderValidation } from '../middlewares/productValidation';

const orderControler = new OrderController();

const orderRouter = express.Router();

orderRouter.get('/', (req, res) => orderControler.findAll(req, res));
orderRouter.post(
  '/', 
  authMiddleware,
  orderValidation,
  (req, res) => orderControler.create(req, res),
);

export default orderRouter;