const express = require("express");
const router = express.Router();
const {getFavoriteCourses, getFavoriteCourse, createFavoriteCourse, updateFavoriteCourse, deleteFavoriteCourse, getFavoriteCourseByLearnerID, rankFavoriteCourse} = require("../controllers/favoriteCourseController");

router.get('/', getFavoriteCourses);

router.get("/rank", rankFavoriteCourse)

router.get("/learner/:id", getFavoriteCourseByLearnerID)

router.get("/:id", getFavoriteCourse);

router.post("/", createFavoriteCourse);

router.put("/:id", updateFavoriteCourse);

router.delete("/:id", deleteFavoriteCourse);

module.exports = router;