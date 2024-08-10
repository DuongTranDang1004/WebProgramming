const express = require("express");
const router = express.Router();

// Example: Get all courses
router.get("/", (req, res) => {
  // Logic for fetching all courses
  res.send("List of all courses");
});

// Example: Get course details
router.get("/:id", (req, res) => {
  const courseId = req.params.id;
  // Logic for fetching course details by ID
  res.send(`Details of course ${courseId}`);
});

module.exports = router;
