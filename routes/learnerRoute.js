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
    pageStylesheet: "css/learner/favCourses",
    pageScripts: [
      "js/clientSideProcessing/learner/",
      "js/fetchAPIs/fetchCourses.js",
    ],
  });
});

// Favorite Instructors
router.get("/favoriteInstructors/:id", (req, res) => {
  res.render("learner/favInstructors", {
    title: "Favorite Courses",
    pageStylesheet: "css/learner/favInstructors",
  });
});

// Order (my cart + payment)
router.get("/order/:id", (req, res) => {
  res.render("learner/order", {
    title: "Order Placement",
    pageStylesheet: "css/learner/order",
  });
});

// Account
router.get("/account/:id", (req, res) => {
  res.render("learner/account", {
    title: "My Account",
    pageStylesheet: "css/learner/account",
  });
});

// Learner My Courses
router.get("/myCourses/:id", (req, res) => {
  res.render("learner/myCourses", {
    title: "My Courses",
    pageStylesheet: "css/learner/myCourses",
  });
});

// Learner My Profile
router.get("/myProfile/:id", (req, res) => {
  res.render("learner/myProfile", {
    title: "My Profile",
    pageStylesheet: "css/learner/myProfile",
  });
});

// Past transaction
router.get("/transactions/:id", (req, res) => {
  res.render("learner/transactions", {
    title: "My Past Transactions",
    pageStylesheet: "css/learner/transactions",
  });
});

module.exports = router;
