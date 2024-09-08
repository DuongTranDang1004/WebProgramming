const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const BoughtCourse = require("../models/boughtCourseModel");
//const Membership = require("../models/membershipModel");

/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: API for Instructors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Instructors:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated ID of the instructor
 *           example: 1
 *         email:
 *           type: string
 *           description: The email of the instructor
 *           example: "jane.doe@example.com"
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
 *           example: "Jane"
 *         lastName:
 *           type: string
 *           description: The last name of the instructor
 *           example: "Doe"
 *         address:
 *           type: string
 *           description: The street address of the instructor
 *           example: "456 Elm St"
 *         city:
 *           type: string
 *           description: The city of the instructor
 *           example: "Anytown"
 *         zipcode:
 *           type: string
 *           description: The postal/zip code of the instructor
 *           example: "67890"
 *         country:
 *           type: string
 *           description: The country code of the instructor
 *           example: "US"
 *         phone:
 *           type: string
 *           description: The phone number of the instructor
 *           example: "+1 987-654-3210"
 */

/**
 * @swagger
 * /instructors:
 *   get:
 *     summary: Retrieve a list of instructors
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: List of instructors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instructor'
 *       500:
 *         description: Internal server error
 */
const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({});
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /instructors/{id}:
 *   get:
 *     summary: Retrieve an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instructor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
const getInstructorById = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
 *       200:
 *         description: Created instructor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       500:
 *         description: Internal server error
 */
const createInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update
const updateInstructor = async (req, res) => {
  try {
    const { id } = req.param;
    const instructor = await Instructor.findByIdAndUpdate(id, req.body);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete
const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.param;
    const instructor = await Instructor.findByIdAndUpdate(id);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /instructors/{id}/courses:
 *   get:
 *     summary: Get courses by instructor ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of courses for the instructor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: No courses found for this instructor
 *       500:
 *         description: Internal server error
 */
const getCoursesByInstructorId = async (req, res) => {
  const { id } = req.params;
  try {
    const courses = await Course.find({ instructorId: id });
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this instructor" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /instructors/{id}/earning:
 *   get:
 *     summary: Get total earnings of an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Total earnings of the instructor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   description: The total amount of sales
 *                 commissionRate:
 *                   type: number
 *                   description: The commission rate applied
 *                 earnings:
 *                   type: number
 *                   description: The total earnings after commission
 *       404:
 *         description: Instructor or sales data not found
 *       500:
 *         description: Internal server error
 */
const getInstructorEarnings = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Instructor ID is required' });
  }

  try {
    // Check if the instructor exists
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Fetch all bought courses related to the instructor
    const boughtCourses = await BoughtCourse.find({ instructorId: id });

    if (boughtCourses.length === 0) {
      return res.status(404).json({ message: "No courses sold by this instructor" });
    }

    // Calculate total sales
    const totalSales = boughtCourses.reduce((sum, course) => sum + course.price, 0);

    // Get the latest membership commission rate
    //const latestMembership = await Membership.findOne().sort({ createdAt: -1 });
    const latestMembership = 0;
    const commissionRate = latestMembership ? latestMembership.commissionRate : 0.10; // Default to 10% if no membership found

    // Calculate earnings after applying the commission
    const earnings = totalSales * (1 - commissionRate);

    res.status(200).json({
      totalSales,
      commissionRate,
      earnings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  getCoursesByInstructorId,
  getInstructorEarnings
};
