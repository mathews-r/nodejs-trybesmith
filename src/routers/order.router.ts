import express from 'express';
import OrderController from '../controllers/order.controller';

const orderControler = new OrderController();

const orderRouter = express.Router();

orderRouter.get('/', (req, res) => orderControler.findAll(req, res));

export default orderRouter;