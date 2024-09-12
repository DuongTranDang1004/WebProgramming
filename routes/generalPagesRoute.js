const express = require("express");
const router = express.Router();

// for page scripts: include fetchAPi first, then client side processing later

// Root path (homepage)
router.get("/", (req, res) => {
  res.render("general/homepage", {
    title: "Home Page",
    pageStylesheet: "css/general/homepage.css",
    pageScript: "js/general/homepage.js",
    layout: "./layouts/homepage",
  });
});
// About us
router.get("/aboutUs", (req, res) => {
  res.render("general/aboutUs", {
    title: "About Us",
    pageStylesheet: "css/general/aboutUs.css",
    pageScripts: ["/js/globalProcessing.js"],
  });
});

//browseCoursesByName

router.get("/browseCoursesByName", (req, res) => {
  res.render("general/browseCoursesByName", {
    title: "Browse Course By Name",
    pageStylesheet: "css/general/browseCoursesByName.css",
    pageScript: "js/general/browseCoursesByName.js",
    layout: "./layouts/homepage",
  });
});

//browseCoursesByCategory

router.get("/browseCoursesByCategory", (req, res) => {
  res.render("general/browseCoursesByCategory", {
    title: "Browse Courses By Category",
    pageStylesheet: "css/general/browseCoursesByCategory.css",
    pageScript: "js/general/browseCoursesByCategory.js",
    layout: "./layouts/homepage",
  });
});

// contactPage
router.get("/contactPage", (req, res) => {
  res.render("general/contactPage", {
    title: "ContactPage",
    pageStylesheet: "css/general/contactPage.css",
    pageScripts: ["/js/general/contactPage.js"],
  });
});

// copyright
router.get("/copyright", (req, res) => {
  res.render("general/copyright", {
    title: "Copyright",
    pageStylesheet: "css/general/copyright.css",

    pageScripts: ["/js/globalProcessing.js"],
  });
});

// faq
router.get("/faq", (req, res) => {
  res.render("general/faq", {
    title: "Frequently Asked Questions",
    pageStylesheet: "css/general/faq.css",
    pageScripts: ["/js/globalProcessing.js"],
  });
});

// myAccount
router.get("/myAccount", (req, res) => {
  res.render("general/myAccount", {
    title: "My Account",
    pageStylesheet: "css/general/myAccount.css",
    pageScripts: ["/js/globalProcessing.js"],
  });
});
// pricing
router.get("/pricing", (req, res) => {
  res.render("general/pricing", {
    title: "Pricing",
    pageStylesheet: "css/general/pricing.css",
    pageScripts: ["/js/globalProcessing.js", "js/general/pricing.js"],
  });
});
// privacy
router.get("/privacy", (req, res) => {
  res.render("general/privacy", {
    title: "Privacy",
    pageStylesheet: "css/general/privacy.css",
    pageScripts: ["/js/globalProcessing.js"],
  });
});
// Tos
router.get("/Tos", (req, res) => {
  res.render("general/Tos", {
    title: "Term of Services",
    pageStylesheet: "css/general/Tos.css",
    pageScripts: ["/js/globalProcessing.js"],
  });
});

module.exports = router;
