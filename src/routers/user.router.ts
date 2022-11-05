import express from 'express';
import UserController from '../controllers/user.controller';
import { classValidation, levelValidation, passwordValidation, usernameValidation }
  from '../middlewares/login.middleware';

const userController = new UserController();
const userRouter = express.Router();

userRouter.post(
  '/',
  usernameValidation,
  passwordValidation,
  classValidation,
  levelValidation,
  (req, res) => userController.create(req, res),
);

export default userRouter;
