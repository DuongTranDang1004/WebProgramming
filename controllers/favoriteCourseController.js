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
 *  schemas:
 *    FavoriteCourse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the favorite course
 *          example: 66d94db8191a5611c1f85f95
 *        learnerId:
 *           type: string
 *           description: The ID of the learner who favorited the course
 *           example: 66d94db8191a5611c1f85e5e
 *        courseId:
 *           type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: The ID of the course
 *                example: 66d94db8191a5611c1f85e6b
 *              category:
 *                type: string
 *                description: The category of the course
 *                example: data science
 *              name:
 *                type: string
 *                description: The name of the course
 *                example: Luxurious Frozen Chicken
 *              price:
 *                type: number
 *                format: float
 *                description: The price of the course
 *                example: 343
 *              description:
 *                type: string
 *                description: A brief description of the course
 *                example: Delego cibo turbo vinum. Conatus consuasor compello. Allatus decimus accusamus terga culpa absorbeo assumenda.
 */

/**
 * @swagger
 * /favoritesCourses:
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
    const favoriteCourses = await FavoriteCourse.find({})
      .populate('courseId', 'name category price description');
    res.status(200).json(favoriteCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritesCourses/learner/{id}:
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
    const favoriteCourses = await FavoriteCourse.find({ learnerId: id })
      .populate('courseId', 'name category price description');
    if (favoriteCourses.length > 0) {
      return res.status(200).json(favoriteCourses);
    } else {
      return res.status(200).json({ message: "No favorite course" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritesCourses/{id}:
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
    const favoriteCourse = await FavoriteCourse.findById(id)
      .populate('courseId', 'name category price description');
    if (!favoriteCourse) {
      return res.status(404).json({ message: "Favorite course not found" });
    }
    res.status(200).json(favoriteCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritesCourses:
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
    const favoriteCourse = await FavoriteCourse.create(req.body);
    res.status(200).json(favoriteCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritesCourses/{id}:
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
    const favoriteCourse = await FavoriteCourse.findByIdAndUpdate(id, req.body, { new: true });

    if (!favoriteCourse) {
      return res.status(404).json({ message: "Favorite course not found" });
    }

    res.status(200).json(favoriteCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /favoritesCourses/{id}:
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
    const favoriteCourse = await FavoriteCourse.findByIdAndDelete(id);

    if (!favoriteCourse) {
      return res.status(404).json({ message: "Favorite course not found" });
    }

    res.status(200).json({ message: "Favorite course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavoriteCourses,
  getFavoriteCourseByLearnerID,
  getFavoriteCourse,
  createFavoriteCourse,
  updateFavoriteCourse,
  deleteFavoriteCourse,
};
