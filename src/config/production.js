import dotenv, { config } from "dotenv";
dotenv.config();

export const production = {
    database_url: process.env.PROD_MONGODB_CONNECTION_URL,
    bcrypt_saltRound: +process.env.PROD_BCRYPT_SALT_ROUND,
    jwt_access: process.env.PROD_JWT_SECRET,
    port: process.env.PORT,
    nodemailerUser: process.env.DEV_NODEMAILER_USER,
    nodemailerPassword:process.env.DEV_NODEMAILER_PASS
  }