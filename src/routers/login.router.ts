import express from 'express';
import UserController from '../controllers/user.controller';
import { passwordValidation, usernameValidation } from '../middlewares/login.middleware';

const userController = new UserController();
const loginRouter = express.Router();

loginRouter.post(
  '/',
  passwordValidation,
  usernameValidation,
  userController.login.bind(userController),
);

export default loginRouter;