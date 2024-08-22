const express = require("express");
const router = express.Router();
const {getInstructors, getInstructor, createInstructor,updateInstructor, deleteInstructor} = require("../controllers/instructorController");

router.get('/', getInstructors);

router.get("/:id", getInstructor);

router.post("/", createInstructor)

router.put("/:id", updateInstructor)

router.delete("/:id", deleteInstructor)

module.exports = router;
