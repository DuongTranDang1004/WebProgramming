const express = require("express");
const router = express.Router();

router.get("/detail/:courseID", (req, res) => {
  res.render("courses/detail", {
    title: "Course Detail",
    pageScripts: [
      "/js/courses/detail.js",
    ],
  });
});

router.get("/detailedPerformance", (req, res) => {
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
    ],
  });
});

router.get("/buyCert/:boughtCourseID", (req, res) => {
  res.render("courses/buyCert", {
    title: "Buy Certificate",
    pageScripts: [
      "/js/courses/buyCert.js",
    ],
  });
});

module.exports = router;