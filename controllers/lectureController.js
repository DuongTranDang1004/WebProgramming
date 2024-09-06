const Lecture = require("../models/lectureModel");
const fs = require('fs');

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
const getLecturesByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;  // Extract courseId from request parameters

    // Find lectures by courseId and sort by index
    const lectures = await Lecture.find({ courseId: mongoose.Types.ObjectId(courseId) })
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

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/videos/');
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + "." + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});
const uploadVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findById({ _id: id });
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    const upload = multer({ storage: storage }).single('video');
    upload(req, res, function (err) {
      console.log(req.file);
      if (err) {
        return res.status(500).json({ message: err.message });
      }
    });
    // Get file name from  /static/videos/ which start with id
    const filename = fs.readdirSync('./static/videos/').find(file => file.startsWith(id));
    lecture.video = "/videos/" + filename;
    lecture.save();
    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getLecture,
  getLectures,
  createLecture,
  updateLecture,
  deleteLecture,
  getLecturesByCourseId,
  uploadVideo,
};