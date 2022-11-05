import express from 'express';
import ProductController from '../controllers/product.controller';
import { amountValidation, nameValidation } from '../middlewares/productValidation';

const productController = new ProductController();
const productRouter = express.Router();

productRouter.post(
  '/', 
  nameValidation, 
  amountValidation,
  (req, res) => productController.create(req, res),
);

productRouter.get('/', (req, res) => productController.findAll(req, res));

export default productRouter;
