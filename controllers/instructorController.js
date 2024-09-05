const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");

/**
 * @swagger
 * tags:
 *   name: Instructors
<<<<<<< HEAD
 *   description: API for managing courses
=======
 *   description: API for Instructors
>>>>>>> origin/Cuong-UI
 */

/**
 * @swagger
 * components:
 *   schemas:
<<<<<<< HEAD
 *     Course:
=======
 *     Instructors:
>>>>>>> origin/Cuong-UI
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
<<<<<<< HEAD
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

//Get all
const getInstructors = async (req,res) => {
=======
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
>>>>>>> origin/Cuong-UI
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
<<<<<<< HEAD
    const {id} = req.params;
=======
>>>>>>> origin/Cuong-UI
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

/**
 * @swagger
 * /instructors/{id}:
 *   put:
 *     summary: Update an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
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
  const { id } = req.params;
  try {
<<<<<<< HEAD
    const {id} = req.params;
    const instructor = await Instructor.findByIdAndUpdate(id, req.body);

    if (!instructor){
      return res.status(404).json({message: "Instructor not found"});
=======
    const instructor = await Instructor.findByIdAndUpdate(id, req.body, { new: true });
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
>>>>>>> origin/Cuong-UI
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
 *           type: integer
 *     responses:
 *       200:
 *         description: Instructor deleted successfully
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
const deleteInstructor = async (req, res) => {
  const { id } = req.params;
  try {
<<<<<<< HEAD
    const {id} = req.params;
    const instructor = await Instructor.findByIdAndUpdate(id);
=======
    const instructor = await Instructor.findByIdAndDelete(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
>>>>>>> origin/Cuong-UI

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
      return res.status(404).json({ message: "No courses found for this instructor" });
    }
    res.status(200).json(courses);
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
  getCoursesByInstructorId
};
