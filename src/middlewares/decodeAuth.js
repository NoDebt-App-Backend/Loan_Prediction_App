import parseJwt from "../utils/parseJwt.js";
import { UnAuthorizedError } from "../error/error.js";
function decodeAuth(req, res, next) {
  const tokenArray = req.headers?.authorization.split(" ");
  const token = tokenArray?.[1];

  try {
    if (!token) throw new UnAuthorizedError("Unauthorized request");

    req.user = parseJwt(token);
    next();
  } catch (err) {
    console.log(err);
  }
}

export { decodeAuth };
