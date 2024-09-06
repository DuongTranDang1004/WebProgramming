const FavoriteCourse = require("../models/favoriteCourseModel");

/**
 * @swagger
 * tags:
 *   name: FavoriteCourses
 *   description: API for managing favorite courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteCourse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the favorite course
 *           example: 6123dce1e3a7f23241d9c8c1
 *         learnerId:
 *           type: string
 *           description: The ID of the learner who favorited the course
 *           example: 12345
 *         courseId:
 *           type: string
 *           description: The ID of the favorited course
 *           example: 67890
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the course was added to favorites
 *           example: 2023-08-30T09:12:45.123Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the favorite was last updated
 *           example: 2023-08-30T09:12:45.123Z
 */

/**
 * @swagger
 * /favoritecourses:
 *   get:
 *     summary: Retrieve a list of all favorite courses
 *     tags: [FavoriteCourses]
 *     responses:
 *       200:
 *         description: List of favorite courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteCourse'
 *       500:
 *         description: Internal server error
 */
const getFavoriteCourses = async (req, res) => {
  try {
    const favoritecourses = await FavoriteCourse.find({})
      .populate('courseId', 'name category price description');
    res.status(200).json(favoritecourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritecourses/learner/{id}:
 *   get:
 *     summary: Retrieve favorite courses by learner ID
 *     tags: [FavoriteCourses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the learner
 *     responses:
 *       200:
 *         description: List of favorite courses for the learner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteCourse'
 *       404:
 *         description: No favorite courses found
 *       500:
 *         description: Internal server error
 */
const getFavoriteCourseByLearnerID = async (req, res) => {
  try {
    const { id } = req.params;
    const favoritecourses = await FavoriteCourse.find({ learnerId: id })
      .populate('courseId', 'name category price description');
    if (favoritecourses.length > 0) {
      return res.status(200).json(favoritecourses);
    } else {
      return res.status(200).json({ message: "No favorite course" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritecourses/{id}:
 *   get:
 *     summary: Retrieve a specific favorite course by ID
 *     tags: [FavoriteCourses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the favorite course
 *     responses:
 *       200:
 *         description: Favorite course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteCourse'
 *       404:
 *         description: Favorite course not found
 *       500:
 *         description: Internal server error
 */
const getFavoriteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const favoritecourse = await FavoriteCourse.findById(id)
      .populate('courseId', 'name category price description');
    res.status(200).json(favoritecourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritecourses:
 *   post:
 *     summary: Add a new favorite course
 *     tags: [FavoriteCourses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteCourse'
 *     responses:
 *       200:
 *         description: Favorite course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteCourse'
 *       500:
 *         description: Internal server error
 */
const createFavoriteCourse = async (req, res) => {
  try {
    const favoritecourse = await FavoriteCourse.create(req.body);
    res.status(200).json(favoritecourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritecourses/{id}:
 *   put:
 *     summary: Update a favorite course by ID
 *     tags: [FavoriteCourses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the favorite course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteCourse'
 *     responses:
 *       200:
 *         description: Favorite course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteCourse'
 *       404:
 *         description: Favorite course not found
 *       500:
 *         description: Internal server error
 */
const updateFavoriteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const favoritecourse = await FavoriteCourse.findByIdAndUpdate(id, req.body);

    if (!favoritecourse) {
      return res.status(404).json({ message: "favoritecourse not found" });
    }

    const updatedFavoriteCourse = await FavoriteCourse.findById(id);
    res.status(200).json(updatedFavoriteCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritecourses/{id}:
 *   delete:
 *     summary: Delete a favorite course by ID
 *     tags: [FavoriteCourses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the favorite course to delete
 *     responses:
 *       200:
 *         description: Favorite course deleted successfully
 *       404:
 *         description: Favorite course not found
 *       500:
 *         description: Internal server error
 */
const deleteFavoriteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const favoritecourse = await FavoriteCourse.findByIdAndUpdate(id);

    if (!favoritecourse) {
      return res.status(404).json({ message: "favoritecourse not found" });
    }
    res.status(200).json({ message: "favoritecourse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavoriteCourses,
  getFavoriteCourse,
  createFavoriteCourse,
  updateFavoriteCourse,
  deleteFavoriteCourse,
  getFavoriteCourseByLearnerID,
};
