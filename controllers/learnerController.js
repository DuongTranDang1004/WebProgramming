const express = require("express");
const router = express.Router();
const Learner = require("../models/learnerModel");

/**
 * @swagger
 * tags:
 *   name: Learners
 *   description: API for managing learners
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Learner:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated ID of the learner
 *           example: 1
 *         email:
 *           type: string
 *           description: The email of the learner
 *           example: "jane.doe@example.com"
 *         password:
 *           type: string
 *           description: The hashed password of the learner
 *           example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Pz7dp62ptDXY1dRg/IXHy"
 *         profilePicture:
 *           type: string
 *           description: The URL of the learner's profile picture
 *           example: "https://example.com/images/profile.jpg"
 *         firstName:
 *           type: string
 *           description: The first name of the learner
 *           example: "Jane"
 *         lastName:
 *           type: string
 *           description: The last name of the learner
 *           example: "Doe"
 *         address:
 *           type: string
 *           description: The street address of the learner
 *           example: "456 Elm St"
 *         city:
 *           type: string
 *           description: The city of the learner
 *           example: "Anytown"
 *         zipcode:
 *           type: string
 *           description: The postal/zip code of the learner
 *           example: "67890"
 *         country:
 *           type: string
 *           description: The country code of the learner
 *           example: "US"
 *         phone:
 *           type: string
 *           description: The phone number of the learner
 *           example: "+1 987-654-3210"
 */

/**
 * @swagger
 * /learners:
 *   get:
 *     summary: Get all learners
 *     tags: [Learners]
 *     responses:
 *       200:
 *         description: A list of learners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Learner'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const learners = await Learner.getAllLearners();
    res.json(learners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /learners/{id}:
 *   get:
 *     summary: Get a learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The learner ID
 *     responses:
 *       200:
 *         description: A learner by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       404:
 *         description: Learner not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const learner = await Learner.getLearnerById(req.params.id);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }
    res.json(learner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
