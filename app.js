// Importing required modules
const express = require("express");
const connectDB = require("./config/db"); // MongoDB connection file
const dotenv = require("dotenv"); // Dotenv is used to load environment variables
const cors = require("cors"); //cors is for cross origin resource sharing between views render origin (FE) and API (BE) origin
const path = require("path"); // Import the path module

// Import Swagger configuration
const { swaggerUi, swaggerDocs } = require("./config/swaggerConfig");

// Load environment variables
// Override is set to true to ensure that the variables are loaded
dotenv.config({ path: "./config/.env", override: true });

const app = express();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

// Route to serve the browse dropdown content
app.get("/dropdown/browse", (req, res) => {
  res.render("partials/browseDropdown");
});

//Use middlewares and modules for the app
app.use(express.json()); // Middleware for parsing JSON from response body

app.use(express.urlencoded({ extended: false })); //encode character for url search query
app.use(cors()); //set up cors so fe has the permisson to fetch
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger setup using the imported configuration

// Authenticate middleware
app.use(require("./middlewares/authenticate"));

// Importing route groups
// const authRoutes = require("./controllers/authController");

const boughtCourseRoutes = require("./routes/boughtCourseRoute");
const contactFormRoutes = require("./routes/contactFormRoute");
const lectureRoutes = require("./routes/lectureRoute");
const favoriteCourseRoutes = require("./routes/favoriteCourseRoute");
const followingInstructorRoutes = require("./routes/followingInstructorRoute");
const courseRoutes = require("./routes/courseRoute");
const instructorRoutes = require("./routes/instructorRoute");
const learnerRoutes = require("./routes/learnerRoute");
const platformAdminRoutes = require("./routes/platformAdminRoute");

// API paths (backend/server)
// app.use("/auth", authRoutes); //authenication has not been done yet
app.use("/api/boughtCourses", boughtCourseRoutes);
app.use("/api/contactForms", contactFormRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/learners", learnerRoutes);
app.use("/api/platformAdmins", platformAdminRoutes);

// /API: backend end router

//SERVE STATIC FILES (ORDER IS IMPORTANT)

//Serve all files form static directory
app.use(express.static(path.join(__dirname, "static")));
//Serve static html files from "views" directory
app.use(express.static(path.join(__dirname, "views")));

// Root path (homepage)
app.get("/", (req, res) => {
  res.send("Welcome to the IT Learning platform API!");
});

//Duong mofidication start

// Set EJS as the templating engine to render partial views
app.set("view engine", "ejs");

//View Paths (front-end/client)

//BrowseCourse path
app.get("/browseCourses", (req, res) => {
  //browse course would be a better name then query result
  res.sendFile(path.join(__dirname, "views", "learner", "browseCourses.html"));
});

//Duong modification end

// Start the server, run at local first, then deploy on https://itlearning.ddns.net/ later on
app.listen(port, host, async () => {
  // Print out PID for easy killing of the server
  console.log(`Server PID: ${process.pid}`);
  console.log("MongoDB_URI:", process.env.MONGODB_URI);

  // Connect to MongoDB
  await connectDB();
  console.log(`Server is running on http://${host}:${port}`);
  console.log(
    `SwaggerUI API Documentation is running on http://${host}:${port}/api-docs/`
  );

  console.log(
    "Browse Course Page available at: http://localhost:3000/browseCourses"
  );
});
