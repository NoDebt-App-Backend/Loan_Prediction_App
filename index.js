import dotenv from "dotenv";
dotenv.config();
// Import routes
import passwordRoute from "./src/routes/password.reset.js";
import usersRoute from "./src/routes/users.js";

// Import Database connection
import connection from "./db.js";

// Import express framework
import express from "express";
const app = express();

// Establish database connection
connection();

// Middleware
app.use(express.json());

// Define routes
app.use("/api/users", usersRoute);
app.use("/api/password-reset", passwordRoute);

// Configure server port
const PORT = Number(process.env.PORT) || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.....`);
});
