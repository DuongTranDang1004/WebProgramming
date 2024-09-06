const express = require("express");
const router = express.Router();
const {getFollowingInstructors, getFollowingInstructor, createFollowingInstructor, updateFollowingInstructor, deleteFollowingInstructor, getFollowingInstructorsByLearnerID} = require("../controllers/followingInstructorController");

router.get('/', getFollowingInstructors);

router.get("/:id", getFollowingInstructor);

router.post("/", createFollowingInstructor);

router.put("/:id", updateFollowingInstructor);

router.delete("/:id", deleteFollowingInstructor);

router.get("/learner/:id", getFollowingInstructorsByLearnerID)

module.exports = router;