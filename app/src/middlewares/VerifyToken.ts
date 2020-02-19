import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export default function verififyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("authtoken");
  if (!token) {
    return res.status(401).send("access denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const vibecheck = jwt.decode(token);
    res.locals.payload = vibecheck;
    res.locals.user = verified;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
}
