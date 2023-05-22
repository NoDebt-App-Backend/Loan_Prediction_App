import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
    function authMiddleWare(req, res, next){
        const tokenArray = req.headers?.authorization?.split(" ");
        const bearer = tokenArray?.[0];
        const tokenValue = tokenArray?.[1];
        console.log(tokenArray);
    try {
        if(!tokenValue){
            return res.json("You must provide an authorization token.")
        }
      const payload = jwt.verify(tokenValue, process.env.JWT_KEY)
      req.user = payload
      next()
    }catch (err){
      return res.json("Access denied, invalid token.")
    }
}


export default authMiddleWare;
