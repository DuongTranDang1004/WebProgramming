const express = require("express");
const router = express.Router();
const {getLectures, getLecture, createLecture,updateLecture, deleteLecture} = require("../controllers/lectureController");

router.get('/', getLectures);

router.get("/:id", getLecture);

router.post("/", createLecture)

router.put("/:id", updateLecture)

router.delete("/:id", deleteLecture)

module.exports = router;