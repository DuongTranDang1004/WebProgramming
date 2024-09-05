const express = require("express");
const router = express.Router();
const {getCourse, getCourses, createCourse, updateCourse, deleteCourse, getCoursesByInstructorID, getIsPublishCourses} = require("../controllers/courseController");

router.get('/', getCourses);

router.get("/:id", getCourse);

router.post("/", createCourse);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

router.get("/publish", getIsPublishCourses)

router.get("instructor/:id", getCoursesByInstructorID)

module.exports = router;