// Importing required modules
const express = require("express");
const connectDB = require("./config/db"); // MongoDB connection file

// Import Swagger configuration
const { swaggerUi, swaggerDocs } = require("./config/swaggerConfig");

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Swagger setup using the imported configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importing route groups
const authRoutes = require("./controllers/authController");
const boughtCourseRoutes = require("./controllers/boughtCourseController");
const contactFormRoutes = require("./controllers/contactFormController");
const courseRoutes = require("./controllers/courseController");
const instructorRoutes = require("./controllers/instructorController");
const learnerRoutes = require("./controllers/learnerController");
const platformAdminRoutes = require("./controllers/platformAdminController");

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
app.listen(port, () => {
  // Connect to MongoDB
  connectDB(); // This will initiate the MongoDB connection
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `SwaggerUI API Documentation is running on http://localhost:${port}/api-docs/`
  );
});
