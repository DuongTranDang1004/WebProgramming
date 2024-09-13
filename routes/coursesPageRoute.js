const express = require("express");
const router = express.Router();

router.get("/detail/:courseID", (req, res) => {
  res.render("courses/detail", {
    title: "Course Detail",
    pageScripts: [
      "/js/courses/detail.js",
      "/js/courses/permission.js",
    ],
  });
});

router.get("/detailedPerformance/:courseID", (req, res) => {
  res.render("courses/detailedPerformance", {
    title: "Course Detail Performance",
    pageScripts: [
      "/js/courses/detailedPerformance.js",
    ],
  });
});

router.get("/pay", (req, res) => {
  res.render("courses/pay", {
    title: "Course Payment",
    pageScripts: [
      "/js/courses/pay.js",
      "/js/courses/permission.js",
    ],
  });
});

router.get("/buyCert/:boughtCourseID", (req, res) => {
  res.render("courses/buyCert", {
    title: "Buy Certificate",
    pageScripts: [
      "/js/courses/buyCert.js",
      "/js/courses/permission.js",
    ],
  });
});

module.exports = router;