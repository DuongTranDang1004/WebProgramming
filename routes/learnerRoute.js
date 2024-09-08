const express = require("express");
const router = express.Router();
const {
  getLearners,
  getLearnerById,
  createLearner,
  updateLearner,
  deleteLearner,
} = require("../controllers/learnerController");

router.get("/", getLearners);

router.get("/:id", getLearnerById);

router.post("/", createLearner);

router.put("/:id", updateLearner);

router.delete("/:id", deleteLearner);

module.exports = router;
