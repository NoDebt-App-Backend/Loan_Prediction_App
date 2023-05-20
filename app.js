import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./src/config/index.js";

// configuring environment variables
dotenv.config();

const app = express();

// Local database connection
mongoose
  .connect(config.database_url)
  .then(() => console.log("Database connected successfully")) // logging "Database connected successfully" to the console
  .catch((err) => {
    console.log(err.message);
  });

  // Configuring the port
const port = config.port || 5000;

// In-built Middleware to gain access to the body
app.use(express.json()); 

// Listening for the express server
app.listen(port, () => console.log(`Listening on port ${port}`)); // logging "Listening on port 4000" to the console.
