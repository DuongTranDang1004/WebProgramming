const express = require("express");
const router = express.Router();

const {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  getCoursesByInstructorId,
  getInstructorEarnings,
  searchInstructors
} = require("../controllers/instructorController");

router.get("/", getInstructors);

router.get("/:id", getInstructorById);

router.get('/instructors', searchInstructors);

router.post("/", createInstructor);

router.put("/:id", updateInstructor);

router.delete("/:id", deleteInstructor);

router.get("/:id/courses", getCoursesByInstructorId);

router.get("/:id/earning", getInstructorEarnings);

module.exports = router;
