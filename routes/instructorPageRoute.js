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
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      "/js/instructors/addNewCourse.js",
    ],
  });
});

module.exports = router;
