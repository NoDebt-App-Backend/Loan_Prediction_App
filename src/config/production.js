import dotenv, { config } from "dotenv";
dotenv.config();

export const production = {
<<<<<<< HEAD
  database_url: process.env.PROD_MONGODB_CONNECTION_URL,
  bcrypt_saltRound: +process.env.PROD_BCRYPT_SALT_ROUND,
  jwt_access: process.env.PROD_JWT_KEY,
  port: process.env.PORT,
  nodemailer_host: process.env.PROD_NODEMAILER_HOST,
  nodemailer_user: process.env.PROD_NODEMAILER_USER,
  nodemailer_pass: process.env.PROD_NODEMAILER_PASS,
  nodemailer_service: process.env.PROD_NODEMAILER_SERVICE,
  base_url: process.env.PROD_NODEMAILER_BASE_URL,
  password_secretkey: process.env.PROD_NODEMAILER_UPDATE_PASSWORD_SECRET_KEY
};
=======
    database_url: process.env.PROD_MONGODB_CONNECTION_URL,
    bcrypt_saltRound: +process.env.PROD_BCRYPT_SALT_ROUND,
    jwt_access: process.env.PROD_JWT_SECRET,
    port: process.env.PORT,
    nodemailerUser: process.env.DEV_NODEMAILER_USER,
    nodemailerPassword:process.env.DEV_NODEMAILER_PASS
  }
>>>>>>> 605cf1f284117a378ede42c260500587ae15d0e9
