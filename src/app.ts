import express from 'express';
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

export default app;
