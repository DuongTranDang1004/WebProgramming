const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const BoughtCourses = require("../models/boughtCourseModel");

/**
 * @swagger
 * tags:
 *   name: BoughtCourses
 *   description: API for managing bought courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BoughtCourse:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated ID of the bought course
 *           example: 1
 *         learnerId:
 *           type: integer
 *           description: The ID of the learner who bought the course
 *           example: 5
 *         courseId:
 *           type: integer
 *           description: The ID of the course that was bought
 *           example: 10
 *         boughtDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the course was bought
 *           example: "2024-08-15T10:00:00Z"
 *         lectureCompletionStatus:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               lectureId:
 *                 type: integer
 *                 description: The ID of the lecture
 *                 example: 1
 *               completeStatus:
 *                 type: boolean
 *                 description: Whether the lecture is completed
 *                 example: true
 *         completionDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the course was completed
 *           example: "2024-08-20T15:00:00Z"
 *         generateCertificate:
 *           type: boolean
 *           description: Indicates whether a certificate can be generated for the course
 *           example: true
 */

/**
 * @swagger
 * /boughtCourses:
 *   get:
 *     summary: Get all bought courses
 *     tags: [BoughtCourses]
 *     responses:
 *       200:
 *         description: A list of bought courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoughtCourse'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const courses = await BoughtCourses.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching courses' });
  }
});

/**
 * @swagger
 * /boughtCourses/{id}:
 *   get:
 *     summary: Get a bought course by ID
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bought course id
 *     responses:
 *       200:
 *         description: A bought course by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoughtCourse'
 *       404:
 *         description: Bought course not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const boughtCourse = await BoughtCourses.findById(id);
    if (!boughtCourse) {
      return res.status(404).json({ message: "Bought course not found" });
    }
    res.json(boughtCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
