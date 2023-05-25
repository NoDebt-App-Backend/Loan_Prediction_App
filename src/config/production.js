export const production = {
    database_url: process.env.STAGING_MONGODB_CONNECTION_URL,
    bcrypt_saltRound: +process.env.STAGING_BCRYPT_SALT_ROUND,
    jwt_access: process.env.STAGING_JWT_SECRET,
    port: process.env.PORT
  }