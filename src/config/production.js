export const production = {
  database_url: process.env.STAGING_MONGODB_CONNECTION_URL,
  bcrypt_saltRound: +process.env.STAGING_BCRYPT_SALT_ROUND,
  jwt_access: process.env.STAGING_JWT_KEY,
  port: process.env.PORT,
  nodemailer_host: process.env.STAGING_NODEMAILER_HOST,
  nodemailer_user: process.env.STAGING_NODEMAILER_USER,
  nodemailer_pass: process.env.STAGING_NODEMAILER_PASS,
  nodemailer_service: process.env.STAGING_NODEMAILER_SERVICE,
  base_url: process.env.STAGING_NODEMAILER_BASE_URL,
  password_secretkey: process.env.STAGING_NODEMAILER_UPDATE_PASSWORD_SECRET_KEY
};
