const express = require("express");
const router = express.Router();
const {
  getLearners,
  getLearnerById,
  createLearner,
  updateLearner,
  deleteLearner,
} = require("../controllers/learnerController");

//path for learner CRUD operations (Leaner API) => only these  paths would have the prefix /api
router.get("/", getLearners);

router.get("/:id", getLearnerById);

router.post("/", createLearner);

router.put("/:id", updateLearner);

router.delete("/:id", deleteLearner);

//extra paths for learner UI page

// Favorite Courses
router.get("/favoriteCourses/:id", (req, res) => {
  res.render("learner/favCourses", {
    title: "Favorite Courses",
    pageScripts: ["/js/learner/favCourses.js"],
  });
});


// Order (my cart + payment)
router.get("/order/:id", (req, res) => {
  res.render("learner/order", {
    title: "Order Placement",
    pageStylesheet: "css/learner/order.css",
    pageScripts: ["/js/learner/order.js"],
  });
});

// Account
router.get("/account/:id", (req, res) => {
  res.render("learner/account", {
    title: "My Account",
    pageStylesheet: "css/learner/account.css",
    pageScripts: ["/js/learner/account.js"],
  });
});

// Learner My Courses
router.get("/myCourses/:id", (req, res) => {
  res.render("learner/myCourses", {
    title: "My Courses",
    pageStylesheet: "css/learner/myCourses.css",
    pageScripts: ["/js/learner/myCourses.js"],
  });
});

// Learner My Profile
router.get("/myProfile/:id", (req, res) => {
  res.render("learner/myProfile", {
    title: "My Profile",
    pageStylesheet: "css/learner/myProfile",
    pageScripts: ["/js/learner/myProfile.js"],
  });
});

router.get("/myCart/:id", (req, res) => {
  res.render("learner/myCart", {
    title: "My Cart",
  });
});

// Past transaction
router.get("/transactions/:id", (req, res) => {
  res.render("learner/transactions", {
    title: "My Past Transactions",
    pageStylesheet: "css/learner/transactions.css",
    pageScripts: ["/js/learner/transactions.js"],
  });
});

module.exports = router;
