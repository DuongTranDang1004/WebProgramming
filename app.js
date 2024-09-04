// Importing required modules
const express = require("express");
const connectDB = require("./config/db"); // MongoDB connection file
const dotenv = require("dotenv"); // Dotenv is used to load environment variables
const cors = require("cors"); //cors is for cross origin resource sharing between views render origin (FE) and API (BE) origin
const path = require("path"); // Import the path module
const expressLayouts = require("express-ejs-layouts"); // import the express-layout npm package

// Import Swagger configuration
const { swaggerUi, swaggerDocs } = require("./config/swaggerConfig");

// Load environment variables
// Override is set to true to ensure that the variables are loaded
dotenv.config({ path: "./config/.env", override: true });

const app = express();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

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
const generalPagesRoutes = require("./routes/generalPagesRoute"); // Import the general pages route

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

//Serve all files form static directory. Then remove all the prefix "/static" from all the routes
app.use(express.static(path.join(__dirname, "static")));
// Serve static html files from "views" directory. Then remove all the prefix "/views" from all the routes
app.use(express.static(path.join(__dirname, "views")));
// This line configures the directory where your EJS (or other view engine) templates are located. Express uses this path to look for view files when you call res.render().
app.set("views", path.join(__dirname, "views"));

//Duong mofidication start

// Set EJS as the templating engine to render partial views from "views" folder
app.set("view engine", "ejs");
app.use(expressLayouts); //use the expressLayout package

//Set the default layout
app.set("layout", "layouts/default");

//View Paths (front-end/client)

// Render custom layouts in the routes
//later on we should define the routers for these routes

//GENERAL PAGES
// Use the general pages routes
app.use("/", generalPagesRoutes);

// //BrowseCourse path
// app.get("/browseCourses", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "general", "browseCourses.html"));
// });

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
  //Print out general pages paths
  console.log(`Home Page available at: http://${host}:${port}/`);
  console.log(`About Us Page available at: http://${host}:${port}/aboutUs`);
});
