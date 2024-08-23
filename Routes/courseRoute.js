const express = require("express");
const router = express.Router();
const {getFavoriteCourses, getFavoriteCourse, createFavoriteCourse, updateFavoriteCourse, deleteFavoriteCourse} = require("../controllers/favoriteCourseController");

router.get('/', getFavoriteCourses);

router.get("/:id", getFavoriteCourse);

router.post("/", createFavoriteCourse);

router.put("/:id", updateFavoriteCourse);

router.delete("/:id", deleteFavoriteCourse);

module.exports = router;