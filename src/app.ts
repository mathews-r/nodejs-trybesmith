import express from 'express';
import httpErrorMiddleware from './middlewares/http.error.middleware';
import loginRouter from './routers/login.router';
import orderRouter from './routers/order.router';
import productRouter from './routers/product.router';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter);

app.use(httpErrorMiddleware);

export default app;
