const express = require("express");
const router = express.Router();
const {createMembership, getMembershipsByInstructorID} = require("../controllers/membershipController")

router.get("/instructor/:id", getMembershipsByInstructorID)

router.post("/", createMembership)

module.exports = router;