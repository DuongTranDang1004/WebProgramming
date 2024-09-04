const express = require("express");
const router = express.Router();

// Root path (homepage)
router.get("/", (req, res) => {
  res.render("general/homepage", {
    title: "Home Page",
    pageStylesheet: "css/general/homepage.css",
  });
});
// About us
router.get("/about", (req, res) => {
  res.render("general/homepage", {
    title: "About Us",
  });
});

module.exports = router;
