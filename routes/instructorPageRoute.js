const express = require("express");
const router = express.Router();

router.get("/billing", (req, res) => {
  res.render("instructors/accountBilling", {
    title: "Account Billing",
    pageScripts: [
      "/js/instructors/permission.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      "/js/instructors/accountBilling.js",
    ],
    pageStylesheet: "css/instructors/accountBilling.css",
  });
});

router.get("/profile", (req, res) => {
  res.render("instructors/accountProfile", {
    title: "Account Profile",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/accountProfile.js",
    ],
  });
});

router.get("/addNewCourse", (req, res) => {
  res.render("instructors/addNewCourse", {
    title: "Add new course",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/addNewCourse.js",
    ],
  });
});

router.get("/createCourse", (req, res) => {
  res.render("instructors/createCourse", {
    title: "Create course",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/createCourse.js",
    ],
  });
});

router.get("/home", (req, res) => {
  res.render("instructors/instructorHome", {
    title: "Create course",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/instructorHome.js",
    ],
    pageStylesheet: "css/instructors/instructorHome.css",
  });
});

router.get("/profile", (req, res) => {
  res.render("instructors/instructorProfile", {
    title: "Instructor profile",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/instructorProfile.js",
      "https://kit.fontawesome.com/eb26321189.js"
    ],
  });
});

router.get("/payment", (req, res) => {
  res.render("instructors/payment", {
    title: "Payment",
    pageScripts: [
      "/js/instructors/permission.js",
    ],
  });
});

router.get("/performance", (req, res) => {
  res.render("instructors/performance", {
    title: "Performance",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/performance.js",
    ],
    pageStylesheet: "css/instructors/performance.css",
  });
});

router.get("/resources", (req, res) => {
  res.render("instructors/resources", {
    title: "Resources",
    pageScripts: [
      "/js/instructors/permission.js",
      "/js/instructors/resources.js",
    ],
    pageStylesheet: "css/instructors/resources.css",
  });
});

module.exports = router;
