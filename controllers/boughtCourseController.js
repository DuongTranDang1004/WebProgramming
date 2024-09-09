const BoughtCourses = require("../models/boughtCourseModel");
const mongoose = require("mongoose");

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
 *           type: ObjectID
 *           description: The auto-generated ID of the bought course
 *           example: 60dcf1b5b5f7c5f3b4b3b1a1
 *         learnerId:
 *           type: ObjectID
 *           description: The ID of the learner who bought the course
 *           example: 60dcf1b5b5f7c5f3b4b3b1a1
 *         courseId:
 *           type: ObjectID
 *           description: The ID of the course that was bought
 *           example: 60dcf1b5b5f7c5f3b4b3b1a1
 *         instructorId:
 *           type: ObjectID
 *           description: The ID of the instructor that was bought
 *           example: 60dcf1b5b5f7c5f3b4b3b1a1
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the course that was bought
 *           example: "2024-08-15T10:00:00Z"
 *         boughtDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the course was bought
 *           example: "2024-08-15T10:00:00Z"
 *         completedLectures:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               lectureId:
 *                 type: ObjectID
 *                 description: The ID of the lecture
 *                 example: 60dcf1b5b5f7c5f3b4b3b1a1
 *               completeStatus:
 *                 type: boolean
 *                 description: Whether the lecture is completed
 *                 example: true
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the course was completed
 *           example: "2024-08-20T15:00:00Z"
 *         courseCompletionStatus:
 *           type: boolean
 *           description: The status whether the ccourse complete or not
 *           example: "2024-08-20T15:00:00Z"
 *         isCertificate:
 *           type: boolean
 *           description: Indicates whether a certificate can be generated for the course
 *           example: true
 */

/**
 * @swagger
 * /api/boughtCourses:
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
 * /api/boughtCourses/{id}:
 *   get:
 *     summary: Get a bought course by ID
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

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
 * /api/boughtCourses:
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
 * /api/boughtCourses/{id}:
 *   put:
 *     summary: Update a bought course by ID
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

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
 * /api/boughtCourses/{id}:
 *   delete:
 *     summary: Delete a bought course by ID
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
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

/**
 * @swagger
 * /api/bought-courses/start-trial:
 *   post:
 *     summary: Start a trial for a course with a 7-day end date
 *     tags: [BoughtCourses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               learnerId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               instructorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trial started for the course
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const startTrial = async (req, res) => {
  const { learnerId, courseId, instructorId } = req.body;

  if (!learnerId || !courseId || !instructorId) {
    return res.status(400).json({ message: "learnerId, courseId, and instructorId are required" });
  }

  try {
    // Set endDate to 7 days from the current date
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    const trialCourse = new BoughtCourses({
      learnerId,
      courseId,
      instructorId,
      endDate: trialEndDate, // Trial ends in 7 days
      courseCompletionStatus: false,
      isCertificate: false,
    });

    await trialCourse.save();
    res.status(201).json(trialCourse);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while starting the trial' });
  }
};

/**
 * @swagger
 * /api/bought-courses/purchase/{id}:
 *   put:
 *     summary: Purchase a course from trial by setting endDate to null
 *     tags: [BoughtCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bought course to purchase
 *     responses:
 *       200:
 *         description: Successfully purchased the course
 *       400:
 *         description: Bad request or the course is not in trial
 *       404:
 *         description: Bought course not found
 *       500:
 *         description: Internal server error
 */
const purchaseCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    const boughtCourse = await BoughtCourses.findById(id);

    if (!boughtCourse) {
      return res.status(404).json({ message: "Bought course not found" });
    }

    // Check if it's a trial (endDate should be null)
    if (boughtCourse.endDate !== null) {
      return res.status(400).json({ message: "This course is not in trial" });
    }

    // Update the endDate to null to indicate a purchase
    boughtCourse.endDate = null;
    await boughtCourse.save();

    res.status(200).json({ message: "Course purchased successfully", boughtCourse });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while purchasing the course' });
  }
};


/**
 * @swagger
 * /api/boughtCourses/{instructorId}:
 *   get:
 *     summary: Get specific instructor id earning
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the instructor
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Instructor not found
 */
// Get Instructor Earning Info
// const getInstructorEarnings = async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid Course ID" });
//       // calculate Total Sales and apply current commission fee from membership table
//     };

//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// }

module.exports = {
  getBoughtCourses,
  getBoughtCourse,
  createBoughtCourse,
  updateBoughtCourse,
  deleteBoughtCourse,
  startTrial,
  purchaseCourse,
};
