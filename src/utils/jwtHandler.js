import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export function newToken(admin) {
  const payload = { adminId: admin._id, email: admin.email };
  const token = jwt.sign(payload, config.jwt_access, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}