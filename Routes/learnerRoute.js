const express = require("express");
const router = express.Router();
const {
  getLearners,
  getLearner,
  createLearner,
  updateLearner,
  deleteLearner,
} = require("../controllers/learnerController");

router.get("/", getLearners);

router.get("/:id", getLearner);

router.post("/", createLearner);

router.put("/:id", updateLearner);

router.delete("/:id", deleteLearner);

module.exports = router;
