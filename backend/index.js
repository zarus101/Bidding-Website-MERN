// Importing necessary packages
const dotenvConfig = require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // Import the Express framework
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const cookieParser = require("cookie-parser"); // Middleware to parse cookies
const mongooseInstance = require("mongoose"); // MongoDB object modeling tool
const error__Handler = require("./main_middlewares/error__Handler"); // Custom error handler middleware
const cron = require('node-cron'); // Task scheduler for scheduling recurring tasks

// Create an instance of the Express application
const newAppInstance = express();

// Use middleware to handle JSON data and cookies
newAppInstance.use(express.json()); // Parse JSON-formatted request bodies
newAppInstance.use(cookieParser());

newAppInstance.use(
  express.urlencoded({
    extended: false,
  })
);

newAppInstance.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL], // Allow requests from specified origins
    credentials: true, // Enable credentials (cookies, HTTP authentication) in CORS requests
  })
);

newAppInstance.use(bodyParser.json()); // Parse JSON-formatted request bodies

// Importing route modules
const newUserRoutes = require("./main_routes/user__Routes");
const newPostRoutes = require("./main_routes/post__Routes");
const newCategoryRoutes = require("./main_routes/category__Routes");
const { create__DefaultAdmin } = require("./main_controller/user__Controller");
const { AutoSellAfterDays } = require("./main_controller/post__Controller");

// Declare the port number
const NEW_PORT = process.env.PORT || 5000;

// Connect to the MongoDB database
mongooseInstance
  .connect(process.env.DATABASE_URL)
  .then(() => {
    // Start the Express server once the database connection is established
    newAppInstance.listen(NEW_PORT, () => {
      console.log(`Server connected to the port: ${NEW_PORT}`);
      // Create the default admin user when the server starts
      create__DefaultAdmin();
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware for handling routes related to users, posts, and product categories
newAppInstance.use("/api/user", newUserRoutes);
newAppInstance.use("/api/post", newPostRoutes);
newAppInstance.use("/api/productCategory", newCategoryRoutes);

// Schedule a task to run once a day at midnight
cron.schedule('0 0 * * *', () => {
  // This function will run at midnight every day
  AutoSellAfterDays();
});

// Use the custom error handler middleware
newAppInstance.use(error__Handler);
