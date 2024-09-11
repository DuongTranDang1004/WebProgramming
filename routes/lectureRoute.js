const express = require("express");
const router = express.Router();
const {
  getLectures,
  getLecture,
  createLecture,
  updateLecture,
  deleteLecture,
  getLecturesByCourseId,
  uploadVideo
} = require("../controllers/lectureController");
const { markLectureComplete } = require("../controllers/markController");

router.get("/", getLectures);

router.post("/markLecture", markLectureComplete);

router.get("/course/:courseId", getLecturesByCourseId);

router.post("/upload/:id", uploadVideo);

router.post("/", createLecture);

router.get("/:id", getLecture);

router.put("/:id", updateLecture);

router.delete("/:id", deleteLecture);

module.exports = router;
