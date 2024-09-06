const mongoose = require('mongoose');
const Lecture = require("../models/lectureModel");

/**
 * @swagger
 * components:
 *   schemas:
 *     Lecture:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the lecture
 *         title:
 *           type: string
 *           description: The title of the lecture
 *         description:
 *           type: string
 *           description: The description of the lecture
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the lecture was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the lecture was last updated
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         title: Introduction to Programming
 *         description: Learn the basics of programming with this introductory course.
 */

/**
 * @swagger
 * /lectures:
 *   get:
 *     summary: Get all lectures
 *     tags: [Lectures]
 *     responses:
 *       200:
 *         description: List of all lectures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lecture'
 *       500:
 *         description: Server error
 */
const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({});
    res.status(200).json({ lectures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /lectures/{id}:
 *   get:
 *     summary: Get a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lecture ID
 *     responses:
 *       200:
 *         description: Lecture details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       404:
 *         description: Lecture not found
 *       500:
 *         description: Server error
 */
const getLecture = async (req, res) => {
  try {
    const { id } = req.params;

    const lecture = await Lecture.findById(id);
    res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to get lectures by courseId in index order
/**
 * @swagger
 * /lectures/course/{courseId}:
 *   get:
 *     summary: Get all lectures by course ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID to get lectures for
 *     responses:
 *       200:
 *         description: List of lectures for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the lecture
 *                   courseId:
 *                     type: string
 *                     description: The ID of the course the lecture belongs to
 *                   title:
 *                     type: string
 *                     description: The title of the lecture
 *                   index:
 *                     type: integer
 *                     description: The index of the lecture in the course
 *                   content:
 *                     type: string
 *                     description: The content of the lecture
 *       404:
 *         description: No lectures found for the specified course
 *       500:
 *         description: Server error
 */
const getLecturesByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;  // Extract courseId from request parameters

    // Find lectures by courseId and sort by index
    const lectures = await Lecture.find({ courseId: new mongoose.Types.ObjectId(courseId) })
      .sort({ index: 1 });

    if (!lectures || lectures.length === 0) {
      return res.status(404).json({ message: 'No lectures found for this course' });
    }

    return res.status(200).json(lectures);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Create
/**
 * @swagger
 * /lectures:
 *   post:
 *     summary: Create a new lecture
 *     tags: [Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lecture'
 *     responses:
 *       200:
 *         description: The created lecture
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       500:
 *         description: Server error
 */
const createLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * @swagger
 * /lectures/{id}:
 *   put:
 *     summary: Update a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lecture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lecture'
 *     responses:
 *       200:
 *         description: The updated lecture
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       404:
 *         description: Lecture not found
 *       500:
 *         description: Server error
 */
const updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /lectures/{id}:
 *   delete:
 *     summary: Delete a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lecture ID
 *     responses:
 *       200:
 *         description: Lecture deleted successfully
 *       404:
 *         description: Lecture not found
 *       500:
 *         description: Server error
 */
const deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByIdAndDelete(id);

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLecture,
  getLectures,
  createLecture,
  updateLecture,
  deleteLecture,
  getLecturesByCourseId
};