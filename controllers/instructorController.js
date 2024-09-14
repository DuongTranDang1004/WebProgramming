const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const BoughtCourse = require("../models/boughtCourseModel");
const Membership = require("../models/membershipModel");
const { faker } = require("@faker-js/faker");

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
 *           description: The auto-generated ID of the course
 *           example: 1
 *         instructorId:
 *           type: integer
 *           description: The ID of the instructor teaching the course
 *           example: 1
 *         category:
 *           type: string
 *           description: The category of the course
 *           example: "front-end"
 *         name:
 *           type: string
 *           description: The name of the course
 *           example: "Introduction to Front-End Development"
 *         thumbnailImage:
 *           type: string
 *           description: The URL of the course's thumbnail image
 *           example: "https://example.com/course-thumbnail.jpg"
 *         price:
 *           type: number
 *           description: The price of the course
 *           example: 99.99
 *         description:
 *           type: string
 *           description: A brief description of the course
 *           example: "This course covers the basics of front-end development, including HTML, CSS, and JavaScript."
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
    const instructors = await Instructor.find({}).populate(
      "membershipId",
      "planName planType"
    );
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
 *           type: string
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
    const { id } = req.params;
    const instructor = await Instructor.findById(id).populate(
      "membershipId",
      "planName planType"
    );
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
    req.body.profilePicture = faker.image.avatarGitHub();
    const instructor = await Instructor.create(req.body);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update
/**
 * @swagger
 * /instructors/{id}:
 *   put:
 *     summary: Update an existing instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instructor'
 *     responses:
 *       200:
 *         description: Updated instructor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
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
/**
 * @swagger
 * /instructors/{id}:
 *   delete:
 *     summary: Delete an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor deleted successfully
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByIdAndDelete(id);

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
 *           type: string
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
    return res.status(400).json({ message: "Instructor ID is required" });
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
      return res
        .status(404)
        .json({ message: "No courses sold by this instructor" });
    }

    // Calculate total sales
    const totalSales = boughtCourses.reduce(
      (sum, course) => sum + course.price,
      0
    );

    // Get the latest membership commission rate
    const latestMembership = await Membership.findOne().sort({ createdAt: -1 });
    const commissionRate = latestMembership
      ? latestMembership.commissionFee
      : 0.1; // Default to 10% if no membership found

    // Calculate earnings after applying the commission
    const earnings = totalSales * (1 - commissionRate);

    res.status(200).json({
      totalSales,
      commissionRate,
      earnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /instructors/search:
 *   get:
 *     summary: Search for instructors by first name, last name, or specialization
 *     tags: [Instructors]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query to match instructors by first name, last name, or specialization
 *     responses:
 *       200:
 *         description: List of instructors matching the query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instructor'
 *       500:
 *         description: Internal server error
 */
const searchInstructors = async (req, res) => {
  const { q, specialization } = req.query; // Get the search query and specialization from the URL parameter

  try {
    // Build the search criteria
    const searchCriteria = {
      $or: [
        { firstName: new RegExp(q, 'i') },
        { lastName: new RegExp(q, 'i') },
        { specialization: new RegExp(q, 'i') },
      ],
    };

    // If a specialization filter is provided, add it to the search criteria
    if (specialization) {
      searchCriteria.specialization = specialization;
    }

    // Search for instructors matching the criteria
    const instructors = await Instructor.find(searchCriteria);

    // Return the found instructors or an empty array
    res.status(200).json(instructors);
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
  getInstructorEarnings,
  searchInstructors
};
