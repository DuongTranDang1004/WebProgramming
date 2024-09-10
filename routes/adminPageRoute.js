const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    // pageStylesheet: "css/general/homepage.css",
    pageScripts: [
      "/js/admin/permission.js",
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js",
      "/js/admin/adminDashboard.js",
    ],
    // layout: "./layouts/default",
  });
});

router.get("/profile", (req, res) => {
  res.render("admin/profile", {
    title: "Admin Profile",
    pageScripts: [
      "/js/admin/permission.js",
      "/js/admin/profile.js",
    ],
    pageStylesheet: "css/admin/profile.css",
  });
})

module.exports = router;
