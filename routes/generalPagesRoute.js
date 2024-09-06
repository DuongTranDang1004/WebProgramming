const express = require("express");
const router = express.Router();

// Root path (homepage)
router.get("/", (req, res) => {
  res.render("general/homepage", {
    title: "Home Page",
    pageStylesheet: "css/general/homepage.css",
    // layout: "./layouts/default",
  });
});
// About us
router.get("/aboutUs", (req, res) => {
  res.render("general/aboutUs", {
    title: "About Us",
    pageStylesheet: "css/general/aboutUs.css",
  });
});

// browseCourse
router.get("/browseCourse", (req, res) => {
  res.render("general/browseCourse", {
    title: "Browse Courses",
    pageStylesheet: "css/general/browseCourse",
  });
});
// browseInstructor
router.get("/browseInstructor", (req, res) => {
  res.render("general/browseInstructor", {
    title: "Browse Instructor",
    pageStylesheet: "css/general/browseInstructor.css",
  });
});
// contactPage
router.get("/contactPage", (req, res) => {
  res.render("general/contactPage", {
    title: "ContactPage",
    pageStylesheet: "css/general/contactPage.css",
  });
});

// copyright
router.get("/copyright", (req, res) => {
  res.render("general/copyright", {
    title: "Copyright",
    pageStylesheet: "css/general/copyright.css",
  });
});

// faq
router.get("/faq", (req, res) => {
  res.render("general/faq", {
    title: "Frequently Asked Questions",
    pageStylesheet: "css/general/faq.css",
  });
});

// myAccount
router.get("/myAccount", (req, res) => {
  res.render("general/myAccount", {
    title: "My Account",
    pageStylesheet: "css/general/myAccount.css",
  });
});
// pricing
router.get("/pricing", (req, res) => {
  res.render("general/pricing", {
    title: "Pricing",
    pageStylesheet: "css/general/pricing.css",
  });
});
// privacy
router.get("/privacy", (req, res) => {
  res.render("general/privacy", {
    title: "Privacy",
    pageStylesheet: "css/general/privacy.css",
  });
});
// Tos
router.get("/Tos", (req, res) => {
  res.render("general/Tos", {
    title: "Term of Services",
    pageStylesheet: "css/general/Tos.css",
  });
});

module.exports = router;