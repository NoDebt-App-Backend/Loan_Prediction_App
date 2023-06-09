import dotenv, { config } from "dotenv";
dotenv.config();

export const production = {
  database_url: process.env.PROD_MONGODB_CONNECTION_URL,
  bcrypt_saltRound: +process.env.PROD_BCRYPT_SALT_ROUND,
  jwt_access: process.env.PROD_JWT_KEY,
  port: process.env.PORT,

  // NODEMAILER ENV PARAMETERS/VARIABLES
  nodemailer_host: process.env.PROD_NODEMAILER_HOST,
  nodemailer_user: process.env.PROD_NODEMAILER_USER,
  nodemailer_pass: process.env.PROD_NODEMAILER_PASS,
  nodemailer_service: process.env.PROD_NODEMAILER_SERVICE,
  base_url: process.env.PROD_NODEMAILER_BASE_URL,
  password_secretkey: process.env.PROD_NODEMAILER_UPDATE_PASSWORD_SECRET_KEY,

  // AWS S3-BUCKET CLIENT PARAMETERS/VARIABLES
  bucket_name: process.env.PROD_BUCKET_NAME,
  bucket_region: process.env.PROD_BUCKET_REGION,
  access_key: process.env.PROD_ACCESS_KEY,
  secret_access_key: process.env.PROD_SECRET_ACCESS_KEY,

  // CLOUDINARY PARAMETERS/VARIABLES
  cloud_name: process.env.PROD_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.PROD_CLOUDINARY_API_KEY,
  api_secret: process.env.PROD_CLOUDINARY_API_SECRET,

  // GOOGLE DEV SOCIAL AUTH PARAMS
  google_id: process.env.PROD_GOOGLE_ID,
  google_secret: process.env.PROD_GOOGLE_SECRET,
  google_callback: process.env.PROD_GOOGLE_CALLBACK,
};
