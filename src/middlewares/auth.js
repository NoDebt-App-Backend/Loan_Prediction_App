import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { config } from "../config/index.js";
import { UnAuthorizedError } from "../error/error.js";
dotenv.config();

function authMiddleWare(req, res, next) {
  const tokenArray = req.headers?.authorization?.split(" ");
  const bearer = tokenArray?.[0];
  const tokenValue = tokenArray?.[1];
  try {
    if (!tokenValue) {
        throw new UnAuthorizedError("You must provide an authorization token.");
    }
    const jwt_secret = config.jwt_access;
    const payload = jwt.verify(tokenValue, jwt_secret);
    req.admin = payload;
    next();
  } catch (err) {
    throw new UnAuthorizedError("Access denied, invalid token.")
  }
}

export default authMiddleWare;
