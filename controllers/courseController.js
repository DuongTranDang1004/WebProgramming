const Course = require("../models/courseModel");
/**
 * @swagger
 * tags:
 *   - name: Courses
 *     description: API for managing courses
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    FavoriteCourse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the favorite course
 *          example: 66d94db8191a5611c1f85f95
 *        learnerId:
 *          type: string
 *          description: The ID of the learner who favorited the course
 *          example: 66d94db8191a5611c1f85e5e
 *        courseId:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: The ID of the course
 *              example: 66d94db8191a5611c1f85e6b
 *            category:
 *              type: string
 *              description: The category of the course
 *              example: data science
 *            name:
 *              type: string
 *              description: The name of the course
 *              example: Luxurious Frozen Chicken
 *            price:
 *              type: number
 *              format: float
 *              description: The price of the course
 *              example: 343
 *            description:
 *              type: string
 *              description: A brief description of the course
 *              example: Delego cibo turbo vinum. Conatus consuasor compello. Allatus decimus accusamus terga culpa absorbeo assumenda.
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
    const courses = await Course.find({}).populate(
      "instructorId",
      "profilePicture firstName lastName jobTitle Bio"
    );
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const courses = await Course.find({ isPublish: true }).populate(
      "instructorId",
      "profilePicture firstName lastName jobTitle Bio"
    );
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const courses = await Course.find({ instructorId: id }).populate(
      "instructorId",
      "profilePicture firstName lastName jobTitle Bio"
    );
    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      return res
        .status(200)
        .json({ message: "No courses for this instructor" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /**
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
 *             instructorId: "60c72b2f9b1e8b6a54b7b16a"
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
    // Log the error stack trace to the console
    console.error("Error fetching course:", error.stack);

    // Return a generic error message to the client
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


/**
 * @swagger
 * /course/search:
 *   get:
 *     summary: Search for courses by name or description
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query to match courses by name or description
 *     responses:
 *       200:
 *         description: List of courses matching the query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */
const searchCourses = async (req, res) => {
  const { q } = req.query; // Get the search query from the URL parameter

  try {
    // Search for courses where the name or description matches the query (case-insensitive)
    const courses = await Course.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
      ],
    }).populate("instructorId", "firstName lastName");

    // Return the found courses or an empty array
    res.status(200).json(courses);
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
  getCoursesByInstructorID,
  searchCourses
};
