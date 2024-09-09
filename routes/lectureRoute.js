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

router.get("/:id", getLecture);

router.post("/", createLecture);

router.put("/:id", updateLecture);

router.delete("/:id", deleteLecture);

router.get("/course/:courseId", getLecturesByCourseId);

router.post("/upload/:id", uploadVideo)

module.exports = router;
router.post("/markLecture", markLectureComplete);

module.exports = router;
