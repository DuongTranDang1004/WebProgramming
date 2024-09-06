const Course = require("../models/courseModel");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the course
 *           example: "64e1a5f9f5e1a5f9f5e1a5f9"
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
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server error
 */
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate('instructorId', 'profilePicture firstName lastName jobTitle Bio');
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

/**
 * @swagger
 * /courses/publish:
 *   get:
 *     summary: Get all published courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all published courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server error
 */
const getIsPublishCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublish: true })
      .populate('instructorId', 'profilePicture firstName lastName jobTitle Bio');
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * @swagger
 * /courses/instructor/{id}:
 *   get:
 *     summary: Get all courses by instructor ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The instructor ID
 *     responses:
 *       200:
 *         description: List of courses by instructor ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: No courses found for the instructor
 *       500:
 *         description: Server error
 */
const getCoursesByInstructorID = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({ instructorId: id })
      .populate('instructorId', 'profilePicture firstName lastName jobTitle Bio');
    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      return res.status(200).json({ message: "No courses for this instructor" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             instructorId: 1
 *             category: "AI"
 *             name: "Introduction to Artificial Intelligence"
 *             thumbnailImage: "https://example.com/ai-course-thumbnail.jpg"
 *             price: 199.99
 *             description: "This course introduces the basics of AI, including machine learning and neural networks."
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Bad request
 */
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: The course description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             category: "cyber security"
 *             name: "Advanced Cyber Security"
 *             thumbnailImage: "https://example.com/cybersecurity-course-thumbnail.jpg"
 *             price: 249.99
 *             description: "This course covers advanced topics in cyber security."
 *     responses:
 *       200:
 *         description: The updated course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       400:
 *         description: Bad request
 */
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getIsPublishCourses,
  getCoursesByInstructorID
};