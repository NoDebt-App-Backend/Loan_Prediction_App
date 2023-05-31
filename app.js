import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./src/config/index.js";
import logger from "morgan";
import { globalErrorHandler } from "./src/utils/globalErrHandler.js";
import loanRouter from "./src/router/loan.route.js";
import router from "./src/router/user.route.js";

import { router as resetPasswordRouter } from "./src/router/passwordReset.route.js";

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
app.use(logger("tiny"));

app.get("/api", (req, res) => {
  res.send("Welcome to NoDebt App");
});

// defining the routes
app.use("/api/users", router);
app.use("/api/loans", loanRouter);

app.use("/api/password-reset", resetPasswordRouter);

// Handling errors sent to the response body
app.use(globalErrorHandler);

// Listening for the express server
app.listen(port, () => console.log(`Listening on port ${port}`)); // logging "Listening on port 4000" to the console.
