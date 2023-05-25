export const production = {
    database_url: process.env.PROD_MONGODB_CONNECTION_URL,
    bcrypt_saltRound: +process.env.PROD_BCRYPT_SALT_ROUND,
    jwt_access: process.env.PROD_JWT_KEY,
    port: process.env.PORT
  }