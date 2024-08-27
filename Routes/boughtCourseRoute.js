const express = require("express");
const router = express.Router();
const {
  getBoughtCourses,
  getBoughtCourse,
  createBoughtCourse,
  updateBoughtCourse,
  deleteBoughtCourse,
} = require("../controllers/boughtCourseController");

router.get("/", getBoughtCourses);

router.get("/:id", getBoughtCourse);

router.post("/", createBoughtCourse);

router.put("/:id", updateBoughtCourse);

router.delete("/:id", deleteBoughtCourse);

module.exports = router;
