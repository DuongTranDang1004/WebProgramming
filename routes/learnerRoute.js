const express = require("express");
const router = express.Router();
const {
  getLearners,
  getLearner,
  createLearner,
  updateLearner,
  deleteLearner,
} = require("../controllers/learnerController");

//path for learner CRUD operations
router.get("/", getLearners);

router.get("/:id", getLearner);

router.post("/", createLearner);

router.put("/:id", updateLearner);

router.delete("/:id", deleteLearner);

//extra paths for learner pages

// Tos
router.get("/", (req, res) => {
  res.render("general/Tos", {
    title: "Term of Services",
    pageStylesheet: "css/general/Tos.css",
  });
});

module.exports = router;
