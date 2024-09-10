const express = require("express");
const router = express.Router();
const {
  getLearners,
  getLearnerById,
  createLearner,
  updateLearner,
  deleteLearner,
} = require("../controllers/learnerController");

//path for learner CRUD operations (Leaner API)
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
    pageStylesheet: "css/learner/favCourses.css",
    pageScripts: [
      "js/fetchAPIs/learner/favCourses.js",
      "js/clientSideProcessing/learner/favCourses.js",
    ],
  });
});

// Favorite Instructors
router.get("/favoriteInstructors/:id", (req, res) => {
  res.render("learner/favInstructors", {
    title: "Favorite Courses",
    pageStylesheet: "css/learner/favInstructors.css",
    pageScripts: [
      "js/fetchAPIs/learner/favInstructors.js",
      "js/clientSideProcessing/learner/favInstructors.js",
    ],
  });
});

// Order (my cart + payment)
router.get("/order/:id", (req, res) => {
  res.render("learner/order", {
    title: "Order Placement",
    pageStylesheet: "css/learner/order",
    pageScripts: [
      "js/fetchAPIs/learner/order.js",
      "js/clientSideProcessing/learner/order.js",
    ],
  });
});

// Account
router.get("/account/:id", (req, res) => {
  res.render("learner/account", {
    title: "My Account",
    pageStylesheet: "css/learner/account",
    pageScripts: [
      "js/fetchAPIs/learner/account.js",
      "js/clientSideProcessing/learner/account.js",
    ],
  });
});

// Learner My Courses
router.get("/myCourses/:id", (req, res) => {
  res.render("learner/myCourses", {
    title: "My Courses",
    pageStylesheet: "css/learner/myCourses",
    pageScripts: [
      "js/fetchAPIs/learner/myCourses.js",
      "js/clientSideProcessing/learner/myCourses.js",
    ],
  });
});

// Learner My Profile
router.get("/myProfile/:id", (req, res) => {
  res.render("learner/myProfile", {
    title: "My Profile",
    pageStylesheet: "css/learner/myProfile",
    pageScripts: [
      "js/fetchAPIs/learner/myProfile.js",
      "js/clientSideProcessing/learner/myProfile.js",
    ],
  });
});

// Past transaction
router.get("/transactions/:id", (req, res) => {
  res.render("learner/transactions", {
    title: "My Past Transactions",
    pageStylesheet: "css/learner/transactions",
    pageScripts: [
      "js/fetchAPIs/learner/transactions.js",
      "js/clientSideProcessing/learner/transactions.js",
    ],
  });
});

module.exports = router;
