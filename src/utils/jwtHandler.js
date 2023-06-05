import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export function newToken(user) {
  const payload = { _id: user._id, email: user.email };
  const token = jwt.sign(payload, config.jwt_access, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}
