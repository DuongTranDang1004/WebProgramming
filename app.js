//Our project main entry point

const express = require("express");
const app = express();
const port = 3000;

// Importing the route groups
const authRoutes = require("./controllers/authController");
const courseRoutes = require("./controllers/courseController");
const instructorRoutes = require("./controllers/instructorController");
const learnerRoutes = require("./controllers/learnerController");

// Use the routers
app.use("/auth", authRoutes); // All auth-related routes will be prefixed with /auth
app.use("/courses", courseRoutes); // All course-related routes will be prefixed with /courses
app.use("/instructors", instructorRoutes); // All instructor-related routes will be prefixed with /instructors
app.use("/learners", learnerRoutes); // All learner-related routes will be prefixed with /learners

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
