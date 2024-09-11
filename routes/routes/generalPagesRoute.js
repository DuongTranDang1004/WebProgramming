const express = require("express");
const router = express.Router();

// for page scripts: include fetchAPi first, then client side processing later

// Root path (homepage)
router.get("/", (req, res) => {
  res.render("general/homepage", {
    title: "Home Page",
    pageStylesheet: "css/general/homepage.css",
    pageScript: "js/general/homepage.js",
    // layout: "./layouts/default",
  });
});
// About us
router.get("/aboutUs", (req, res) => {
  res.render("general/aboutUs", {
    title: "About Us",
    pageStylesheet: "css/general/aboutUs.css",
    pageScript: "js/globalProcessing.js",
  });
});

// browseCourse
router.get("/browseCourse", (req, res) => {
  res.render("general/browseCourse", {
    title: "Browse Courses",
    pageStylesheet: "css/general/browseCourse",
    pageScript: "js/globalProcessing.js",
  });
});
// browseInstructor
router.get("/browseInstructor", (req, res) => {
  res.render("general/browseInstructor", {
    title: "Browse Instructor",
    pageStylesheet: "css/general/browseInstructor.css",
    pageScript: "js/globalProcessing.js",
  });
});
// contactPage
router.get("/contactPage", (req, res) => {
  res.render("general/contactPage", {
    title: "ContactPage",
    pageStylesheet: "css/general/contactPage.css",
    pageScript: "js/general/contactPage.js",
  });
});

// copyright
router.get("/copyright", (req, res) => {
  res.render("general/copyright", {
    title: "Copyright",
    pageStylesheet: "css/general/copyright.css",
    pageScript: "js/general/contactPage.js",
  });
});

// faq
router.get("/faq", (req, res) => {
  res.render("general/faq", {
    title: "Frequently Asked Questions",
    pageStylesheet: "css/general/faq.css",
    pageScript: "js/general/contactPage.js",
  });
});

// myAccount
router.get("/myAccount", (req, res) => {
  res.render("general/myAccount", {
    title: "My Account",
    pageStylesheet: "css/general/myAccount.css",
    pageScript: "js/general/contactPage.js",
  });
});
// pricing
router.get("/pricing", (req, res) => {
  res.render("general/pricing", {
    title: "Pricing",
    pageStylesheet: "css/general/pricing.css",
    pageScript: "js/general/contactPage.js",
  });
});
// privacy
router.get("/privacy", (req, res) => {
  res.render("general/privacy", {
    title: "Privacy",
    pageStylesheet: "css/general/privacy.css",
    pageScript: "js/general/contactPage.js",
  });
});
// Tos
router.get("/Tos", (req, res) => {
  res.render("general/Tos", {
    title: "Term of Services",
    pageStylesheet: "css/general/Tos.css",
    pageScript: "js/general/contactPage.js",
  });
});

module.exports = router;