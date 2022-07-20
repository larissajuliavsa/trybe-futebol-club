import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import LoginRepository from '../repository/LoginRepository';
import Bcrypt from '../utils/Bcrypt';
import User from '../database/models/User';

const repository = new LoginRepository();
const bcrypt = new Bcrypt();

const MSG_NULL = 'All fields must be filled';
const MSG_INCORRECT = 'Incorrect email or password';
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

export const throwMiddleware: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.status) return res.status(500).json({ message: 'Internal Server Error' });
};

export const emailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ where: { email } });

  if (!email || undefined) return res.status(BAD_REQUEST).json({ message: MSG_NULL });
  if (!findEmail) return res.status(UNAUTHORIZED).json({ message: MSG_INCORRECT });

  next();
};

export const passwordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const findPassword = await repository.getLogin(email); // findOne({ where: { email } });
  const crypt = bcrypt.compare(password, findPassword.password);

  if (!crypt) return res.status(UNAUTHORIZED).json({ message: MSG_INCORRECT });
  if (!password || password.length <= 5) return res.status(BAD_REQUEST).json({ message: MSG_NULL });

  next();
};
