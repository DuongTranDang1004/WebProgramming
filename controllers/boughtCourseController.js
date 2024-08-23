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
// Get all bought courses
const getBoughtCourses = async (req, res) => {
  try {
    const courses = await BoughtCourses.find({})
      .populate('learnerId', 'firstName lastName email')
      .populate('courseId', 'name category price');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching courses' });
  }
};

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
 *         description: The bought course ID
 *     responses:
 *       200:
 *         description: A bought course by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoughtCourse'
 *       404:
 *         description: Bought course not found
 *       500:
 *         description: Internal server error
 */
// Get bought course by ID
const getBoughtCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const boughtCourse = await BoughtCourses.findById(id)
      .populate('learnerId', 'firstName lastName email')
      .populate('courseId', 'name category price');

    if (!boughtCourse) {
      return res.status(404).json({ message: "Bought course not found" });
    }
    res.status(200).json(boughtCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /boughtCourses:
 *   post:
 *     summary: Create a new bought course
 *     tags: [BoughtCourses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoughtCourse'
 *     responses:
 *       201:
 *         description: The created bought course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoughtCourse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// Create a new bought course
const createBoughtCourse = async (req, res) => {
  try {
    const boughtCourse = new BoughtCourses(req.body);
    await boughtCourse.save();
    res.status(201).json(boughtCourse);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the bought course' });
  }
};

/**
 * @swagger
 * /boughtCourses/{id}:
 *   put:
 *     summary: Update a bought course by ID
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bought course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoughtCourse'
 *     responses:
 *       200:
 *         description: The updated bought course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoughtCourse'
 *       404:
 *         description: Bought course not found
 *       500:
 *         description: Internal server error
 */
// Update bought course by ID
const updateBoughtCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = await BoughtCourses.findByIdAndUpdate(id, req.body, { new: true })
      .populate('learnerId', 'firstName lastName email')
      .populate('courseId', 'name category price');

    if (!updatedCourse) {
      return res.status(404).json({ message: "Bought course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /boughtCourses/{id}:
 *   delete:
 *     summary: Delete a bought course by ID
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bought course ID
 *     responses:
 *       204:
 *         description: No content, course deleted successfully
 *       404:
 *         description: Bought course not found
 *       500:
 *         description: Internal server error
 */
// Delete bought course by ID
const deleteBoughtCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCourse = await BoughtCourses.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Bought course not found" });
    }
    res.status(204).json({ message: "Bought course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBoughtCourses,
  getBoughtCourse,
  createBoughtCourse,
  updateBoughtCourse,
  deleteBoughtCourse,
};
