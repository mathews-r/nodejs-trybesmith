import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers as IncomingHttpHeaders;
  
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    req.body.user = decoded;
    return next();
  } catch (error) {
    // throw new HttpException(401, 'Invalid token');
    const e = res.status(401).json({ message: 'Invalid token' });
    next(e);
  }
}