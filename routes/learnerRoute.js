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

module.exports = router;
