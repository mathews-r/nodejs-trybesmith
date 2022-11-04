import express from 'express';
import ProductController from '../controllers/product.controller';

const productController = new ProductController();
const productRouter = express.Router();

productRouter.post('/', (req, res) => productController.create(req, res));

productRouter.get('/', (req, res) => productController.findAll(req, res));

export default productRouter;
