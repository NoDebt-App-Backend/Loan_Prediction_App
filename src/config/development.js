import dotenv from "dotenv";
dotenv.config();

// setting up node development environment
export const development = {
    database_url: process.env.DEV_MONGODB_CONNECTION_URL,
    port: process.env.PORT,
    bcrypt_saltRound: +process.env.DEV_BCRYPT_SALT_ROUND,
}