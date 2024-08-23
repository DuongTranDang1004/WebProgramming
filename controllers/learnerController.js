const Learners = require("../models/learnerModel");

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
// Get all learners
const getLearners = async (req, res) => {
  try {
    const learners = await Learners.find({});
    res.status(200).json(learners);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the learners.' });
  }
};

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
// Get learner by ID
const getLearner = async (req, res) => {
  try {
    const { id } = req.params;
    const learner = await Learners.findById(id);

    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    res.status(200).json(learner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /learners:
 *   post:
 *     summary: Create a new learner
 *     tags: [Learners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       201:
 *         description: Learner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// Create a new learner
const createLearner = async (req, res) => {
  try {
    const newLearner = new Learners(req.body);
    await newLearner.save();
    res.status(201).json(newLearner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /learners/{id}:
 *   put:
 *     summary: Update a learner by ID
 *     tags: [Learners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The learner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Learner'
 *     responses:
 *       200:
 *         description: Learner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Learner'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Learner not found
 *       500:
 *         description: Internal server error
 */
// Update learner by ID
const updateLearner = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLearner = await Learners.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLearner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    res.status(200).json(updatedLearner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /learners/{id}:
 *   delete:
 *     summary: Delete a learner by ID
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
 *         description: Learner deleted successfully
 *       404:
 *         description: Learner not found
 *       500:
 *         description: Internal server error
 */
// Delete learner by ID
const deleteLearner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLearner = await Learners.findByIdAndDelete(id);

    if (!deletedLearner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    res.status(200).json({ message: "Learner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLearners,
  getLearner,
  createLearner,
  updateLearner,
  deleteLearner,
};
