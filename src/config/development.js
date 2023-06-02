import dotenv from "dotenv";
dotenv.config();

// setting up node development environment
export const development = {
  database_url: process.env.DEV_MONGODB_CONNECTION_URL,
  bcrypt_saltRound: +process.env.DEV_BCRYPT_SALT_ROUND,
  port: process.env.PORT,
  jwt_access: process.env.DEV_JWT_KEY,
  nodemailer_host: process.env.DEV_NODEMAILER_HOST,
  nodemailer_user: process.env.DEV_NODEMAILER_USER,
  nodemailer_pass: process.env.DEV_NODEMAILER_PASS,
  nodemailer_service: process.env.DEV_NODEMAILER_SERVICE,
  base_url: process.env.DEV_NODEMAILER_BASE_URL,
  password_secretkey: process.env.DEV_NODEMAILER_UPDATE_PASSWORD_SECRET_KEY,
  bucket_name: process.env.DEV_BUCKET_NAME,
  bucket_region: process.env.DEV_BUCKET_REGION,
  access_key: process.env.DEV_ACCESS_KEY,
  secret_access_key: process.env.DEV_SECRET_ACCESS_KEY
};
