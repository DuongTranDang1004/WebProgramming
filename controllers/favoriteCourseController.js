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
    const favoriteCourses = await FavoriteCourse.find({}).populate(
      "courseId",
      "name category price description"
    );
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
    const favoriteCourses = await FavoriteCourse.find({learnerId: id,})
      .populate("courseId", "name category price description thumbnailImage instructorId")

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
    const favoriteCourse = await FavoriteCourse.findById(id).populate(
      "courseId",
      "name category price description"
    );
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
    const favoriteCourse = await FavoriteCourse.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

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
      return res.status(204).json({ message: "Favorite course not found" });
    }

    res.status(200).json({ message: "Favorite course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * @swagger
 * /favoritesCourses/rank:
 *   get:
 *     summary: Get a ranked list of favorite courses based on the number of favorites
 *     tags: [FavoriteCourses]
 *     responses:
 *       200:
 *         description: A ranked list of courses based on the number of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the course
 *                     example: "66d94db8191a5611c1f85e6b"
 *                   favoriteCount:
 *                     type: integer
 *                     description: The number of times the course has been favorited
 *                     example: 10
 *       500:
 *         description: Internal server error
 */

async function rankFavoriteCourse(req, res) {
  try {
    const rankedCourses = await FavoriteCourse.aggregate([
      {
        // Group by courseId and count the number of favorites
        $group: {
          _id: "$courseId",
          favoriteCount: { $sum: 1 }, // Increment count for each favorite
        },
      },
      {
        // Sort the results by favoriteCount in descending order
        $sort: { favoriteCount: -1 },
      },
      {
        // Lookup to fetch course details from the Courses collection
        $lookup: {
          from: "Courses", // Courses collection
          localField: "_id", // _id from the previous $group (which is courseId)
          foreignField: "_id", // course _id in the Courses collection
          as: "courseDetails", // The output field that will contain course data
        },
      },
      {
        // Unwind the course details array to convert it into an object
        $unwind: "$courseDetails",
      },
      {
        // Lookup to fetch instructor details from the Instructors collection
        $lookup: {
          from: "Instructors", // Instructors collection
          localField: "courseDetails.instructorId", // instructorId from courseDetails
          foreignField: "_id", // _id in the Instructors collection
          as: "instructorDetails", // The output field that will contain instructor data
        },
      },
      {
        // Unwind the instructor details array to convert it into an object
        $unwind: "$instructorDetails",
      },
      {
        // Project only the necessary fields
        $project: {
          _id: 1,
          favoriteCount: 1,
          "courseDetails.name": 1,
          "courseDetails.thumbnailImage": 1,
          "courseDetails.price": 1,
          "instructorDetails.firstName": 1,
          "instructorDetails.lastName": 1,
        },
      },
    ]);
    res.status(200).json(rankedCourses);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while ranking favorite courses.",
      error: error.message,
    });
  }
}


module.exports = {
  getFavoriteCourses,
  getFavoriteCourseByLearnerID,
  getFavoriteCourse,
  createFavoriteCourse,
  updateFavoriteCourse,
  deleteFavoriteCourse,
  rankFavoriteCourse,
};
