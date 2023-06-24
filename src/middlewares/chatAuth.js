import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";

import dotenv from "dotenv";
dotenv.config();
async function chatAuth(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.DEV_JWT_KEY);
      req.admin = await Admin.findById(decoded.adminId).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}

export { chatAuth };
