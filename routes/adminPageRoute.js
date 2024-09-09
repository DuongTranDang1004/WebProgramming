const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    // pageStylesheet: "css/general/homepage.css",
    pageScripts: [
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js",
      "/js/admin/adminDashboard.js",
    ],
    // layout: "./layouts/default",
  });
});

module.exports = router;
