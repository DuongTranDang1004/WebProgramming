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
});

router.get("/update", (req, res) => {
  res.render("admin/updateProfile", {
    title: "Update admin profile",
    pageScripts: [
      "/js/admin/permission.js",
      "/js/admin/updateProfile.js",
    ],
    pageStylesheet: "css/admin/updateProfile.css",
  })
});

router.get("/management/learners", (req, res) => {
  res.render("admin/management/learners", {
    title: "Learners Management",
    pageScripts: [
      "/js/admin/permission.js",
      "/js/admin/management/learners.js",
    ],
    pageStylesheet: "css/admin/management/learners.css",
  });
});

router.get("/management/learners/:learnerID", (req, res) => {
  res.render("admin/management/editLearner", {
    title: "Learners Management",
    pageScripts: [
      "/js/admin/permission.js",
      "/js/admin/management/editLearner.js",
    ],
    pageStylesheet: "css/admin/management/editLearner.css",
  });
});

router.get("/management/instructors/", (req, res) => {
  res.render("admin/management/instructors", {
    title: "Instructors Management",
    pageScripts: [
      "/js/admin/permission.js",
      "/js/admin/management/instructors.js",
    ],
    pageStylesheet: "css/admin/management/instructors.css",
  });
});

router.get("/management/instructors/:instructorID", (req, res) => {
  res.render("admin/management/editInstructor", {
    title: "Instructor Management",
    pageScripts: [
      "/js/admin/permission.js",
      "/js/admin/management/editInstructor.js",
    ],
    pageStylesheet: "css/admin/management/editInstructor.css",
  });
});

module.exports = router;
