import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import User from '../database/models/User';
import LoginRepository from '../repository/LoginRepository';
import Bcrypt from '../utils/Bcrypt';
import TeamRepository from '../repository/TeamRepository';

const Login = new LoginRepository();
const Team = new TeamRepository();
const bcrypt = new Bcrypt();

const MSG_NULL = 'All fields must be filled';
const MSG_INCORRECT = 'Incorrect email or password';
const INVALID_TOKEN = 'Token must be a valid token';
const SAME_TEAM = 'It is not possible to create a match with two equal teams';
const NULL_TEAM = 'There is no team with such id!';
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

export const throwMiddleware: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.status) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const emailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ where: { email } });

  if (!email || undefined) {
    return res.status(BAD_REQUEST).json({ message: MSG_NULL });
  }
  if (!findEmail) {
    return res.status(UNAUTHORIZED).json({ message: MSG_INCORRECT });
  }

  next();
};

export const passwordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const findPassword = await Login.getLogin(email); // findOne({ where: { email } });
  const crypt = bcrypt.compare(password, findPassword.password);

  if (!crypt) return res.status(UNAUTHORIZED).json({ message: MSG_INCORRECT });
  if (!password || password.length <= 5) {
    return res.status(BAD_REQUEST).json({ message: MSG_NULL });
  }

  next();
};

export const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token) { return res.status(401).json({ message: INVALID_TOKEN }); }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as jwt.JwtPayload;

    console.log(decoded);
    const user = await Login.getLogin(decoded.email);

    if (!user) return res.status(401).json({ message: INVALID_TOKEN });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: INVALID_TOKEN });
  }
};

export const matchesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const findHomeTeam = await Team.getTeamId(req.body.homeTeam); // está buscando id de home
  const findAwayTeam = await Team.getTeamId(req.body.awayTeam); // está buscando id de away

  if (!findHomeTeam || !findAwayTeam) {
    return res.status(NOT_FOUND).json({ message: NULL_TEAM }); // status: 404 msg: "There is no team with such id!"
  }

  if (req.body.homeTeam === req.body.awayTeam) {
    return res.status(401).json({ message: SAME_TEAM }); // msg: "It is not possible to create a match with two equal teams"
  }

  next();
};
