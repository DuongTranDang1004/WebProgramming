const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Instructors = require("../models/instructorModel");

/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: API for managing instructors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Instructor:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated ID of the instructor
 *           example: 1
 *         email:
 *           type: string
 *           description: The email of the instructor
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: The hashed password of the instructor
 *           example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Pz7dp62ptDXY1dRg/IXHy"
 *         profilePicture:
 *           type: string
 *           description: The URL of the instructor's profile picture
 *           example: "https://example.com/images/profile.jpg"
 *         firstName:
 *           type: string
 *           description: The first name of the instructor
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: The last name of the instructor
 *           example: "Doe"
 *         address:
 *           type: string
 *           description: The street address of the instructor
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           description: The city of the instructor
 *           example: "Anytown"
 *         zipcode:
 *           type: string
 *           description: The postal/zip code of the instructor
 *           example: "12345"
 *         country:
 *           type: string
 *           description: The country code of the instructor
 *           example: "US"
 *         phone:
 *           type: string
 *           description: The phone number of the instructor
 *           example: "+1 123-456-7890"
 *         schoolOrCompanyName:
 *           type: string
 *           description: The name of the school or company where the instructor works
 *           example: "Example University"
 *         jobTitle:
 *           type: string
 *           description: The job title of the instructor
 *           example: "Senior Lecturer"
 *         specialization:
 *           type: string
 *           description: The instructor's specialization (e.g., "front-end", "back-end", etc.)
 *           example: "data science"
 *         status:
 *           type: string
 *           description: The status of the instructor (e.g., "active", "inactive")
 *           example: "active"
 *         membership:
 *           type: string
 *           description: The membership level of the instructor (e.g., "basic", "silver", etc.)
 *           example: "gold"
 */

/**
 * @swagger
 * /instructors:
 *   get:
 *     summary: Get all instructors
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: A list of instructors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instructor'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructors.find({});
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /instructors/{id}:
 *   get:
 *     summary: Get an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The instructor ID
 *     responses:
 *       200:
 *         description: An instructor by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const instructor = await Instructors.findById(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /instructors:
 *   post:
 *     summary: Create a new instructor
 *     tags: [Instructors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instructor'
 *     responses:
 *       201:
 *         description: Learner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const newInstructor = new Instructors(req.body);
    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
