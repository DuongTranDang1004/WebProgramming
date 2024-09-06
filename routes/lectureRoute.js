const express = require("express");
const router = express.Router();
const {getLectures, getLecture, createLecture,updateLecture, deleteLecture, getLecturesByCourseId} = require("../controllers/lectureController");

router.get('/', getLectures);

router.get("/:id", getLecture);

router.post("/", createLecture)

router.put("/:id", updateLecture)

router.delete("/:id", deleteLecture)

router.get("/course/:courseId", getLecturesByCourseId)

module.exports = router;