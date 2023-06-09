import dotenv from "dotenv";
dotenv.config();
import { development } from "./development.js";
import { production } from "./production.js";
import colors from "colors";

const environment = process.env.NODE_ENV;

let config;

if (!environment) throw new Error("No environment setup");

// Logging to the console to indicate the environment
console.log(`server setup to ${environment}!!!👨‍💻`.magenta.bold);

if (environment.trim() === "development") {
  config = {...development};
} else {
    config = {...production};
}

export { config };
