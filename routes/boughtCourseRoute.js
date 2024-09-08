const express = require("express");
const router = express.Router();
const {
  getBoughtCourses,
  getBoughtCourse,
  createBoughtCourse,
  updateBoughtCourse,
  deleteBoughtCourse,
  startTrial,
  purchaseCourse,
} = require("../controllers/boughtCourseController");

router.get("/", getBoughtCourses);

router.get("/:id", getBoughtCourse);

router.post("/", createBoughtCourse);

router.put("/:id", updateBoughtCourse);

router.delete("/:id", deleteBoughtCourse);

// New routes
router.post('/start-trial', startTrial); // Route to start a trial
router.put('/purchase/:id', purchaseCourse); // Route to purchase the trial

module.exports = router;
