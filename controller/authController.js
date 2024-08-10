const express = require("express");
const router = express.Router();

// Example: Login route
router.post("/login", (req, res) => {
  // Logic for logging in a user
  res.send("User logged in");
});

// Example: Register route
router.post("/register", (req, res) => {
  // Logic for registering a user
  res.send("User registered");
});

// Example: Logout route
router.post("/logout", (req, res) => {
  // Logic for logging out a user
  res.send("User logged out");
});

module.exports = router;
