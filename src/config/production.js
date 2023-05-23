export const production = {
    mongodb_connection_url: process.env.PROD_MONGODB_CONNECTION_URL,
    bycrypt_salt_round: +process.env.PROD_BCRYPT_SALT_ROUND,
    jwt_secret_key: process.env.PROD_JWT_SECRET,
    port:+process.env.PORT
  }