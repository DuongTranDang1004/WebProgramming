// Importing required modules
const express = require("express");
const connectDB = require("./config/db"); // MongoDB connection file
const dotenv = require("dotenv"); // Dotenv is used to load environment variables

// Import Swagger configuration
const { swaggerUi, swaggerDocs } = require("./config/swaggerConfig");

// Load environment variables
// Override is set to true to ensure that the variables are loaded
dotenv.config({ path: "./config/.env", override: true });

const app = express();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

// Middleware for parsing JSON bodies
app.use(express.json());

// Swagger setup using the imported configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importing route groups
// const authRoutes = require("./controllers/authController");
const boughtCourseRoutes = require("./Routes/boughtCourseRoute");
const contactFormRoutes = require("./Routes/contactFormRoute");

const courseRoutes = require("./Routes/courseRoute"); // Ensure the correct path
const instructorRoutes = require("./Routes/instructorRoute"); // Ensure the correct path
const learnerRoutes = require("./Routes/learnerRoute");
const platformAdminRoutes = require("./Routes/platformAdminRoute");

// Using the controllers as routers
// app.use("/auth", authRoutes); //authenication has not been done yet
app.use("/boughtCourses", boughtCourseRoutes);
app.use("/contactForms", contactFormRoutes);
app.use("/courses", courseRoutes);
app.use("/instructors", instructorRoutes);
app.use("/learners", learnerRoutes);
app.use("/platformAdmins", platformAdminRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the IT Learning platform API!");
});

// Start the server, run at local first, then deploy on https://itlearning.ddns.net/ later on
app.listen(port, host, async () => {
  // Print out PID for easy killing of the server
  console.log(`Server PID: ${process.pid}`);
  console.log("MongoDB_URI:", process.env.MONGODB_URI);

  // Connect to MongoDB
  // Must be done before the server starts
  await connectDB(); // This will initiate the MongoDB connection
  console.log(`Server is running on http://${host}:${port}`);
  console.log(
    `SwaggerUI API Documentation is running on http://${host}:${port}/api-docs/`
  );
});
