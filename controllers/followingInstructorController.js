const FollowingInstructor = require("../models/followingInstructorModel");
const mongoose = require('mongoose');
/**
 * @swagger
 * tags:
 *   name: FollowingInstructor
 *   description: API for FollowingInstructor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FollowingInstructor:
 *       type: object
 *       required:
 *         - learnerId
 *         - instructorId
 *       properties:
 *         learnerId:
 *           type: string
 *           description: The ID of the learner following the instructor
 *           example: "605c72ef1e7fbb001f6471f6"
 *         instructorId:
 *           type: string
 *           description: The ID of the instructor being followed
 *           example: "605c72ef1e7fbb001f6471f7"
 *       example:
 *         learnerId: "605c72ef1e7fbb001f6471f6"
 *         instructorId: "605c72ef1e7fbb001f6471f7"
 */

//Get all
/**
 * @swagger
 * /followingInstructors:
 *   get:
 *     summary: Get all following instructors
 *     tags: [FollowingInstructors]
 *     responses:
 *       200:
 *         description: A list of all following instructors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FollowingInstructor'
 *       500:
 *         description: Server error
 */
const getFollowingInstructors = async (req,res) => {
  try {
    const followingInstructors = await FollowingInstructor.find({})
    .populate('instructorId', 'profilePicture firstName lastName jobTitle Bio');
    res.status(200).json(followingInstructors)
  } catch(error){
    res.status(500).json({ message: error.message})
  }
}

//Get all by learnerID
/**
 * @swagger
 * /followingInstructors/learner/{id}:
 *   get:
 *     summary: Get all following instructors by learner ID
 *     tags: [FollowingInstructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Learner ID
 *     responses:
 *       200:
 *         description: A list of following instructors for the learner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FollowingInstructor'
 *       404:
 *         description: No following instructor found
 *       500:
 *         description: Server error
 */
const getFollowingInstructorsByLearnerID = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid learnerId format" });
    }

    const followingInstructors = await FollowingInstructor.find({ learnerId: id })
      .populate('instructorId', 'profilePicture firstName lastName jobTitle Bio');

    if (followingInstructors.length > 0) {
      return res.status(200).json(followingInstructors);
    } else {
      return res.status(200).json({ message: "No following instructor" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


//Get by ID
/**
 * @swagger
 * /followingInstructors/{id}:
 *   get:
 *     summary: Get a following instructor by ID
 *     tags: [FollowingInstructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: FollowingInstructor ID
 *     responses:
 *       200:
 *         description: A following instructor object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowingInstructor'
 *       500:
 *         description: Server error
 */
const getFollowingInstructor = async (req,res) => {
  try {
    const {id} = req.params;
    const followingInstructor = await FollowingInstructor.findById(id)
      .populate('instructorId', 'profilePicture firstName lastName jobTitle Bio');
    res.status(200).json(followingInstructor)
  } catch(error){
    res.status(500).json({ message: error.message})
  }
}


//Create
/**
 * @swagger
 * /followingInstructors:
 *   post:
 *     summary: Create a following instructor
 *     tags: [FollowingInstructors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowingInstructor'
 *     responses:
 *       200:
 *         description: Following instructor created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowingInstructor'
 *       500:
 *         description: Server error
 */
const createFollowingInstructor = async (req,res) => {
  try {
    const followingInstructor = await FollowingInstructor.create(req.body);
    res.status(200).json(FollowingInstructor)
  } catch (error){
    res.status(500).json({message: error.message})
  }
}

//Update
/**
 * @swagger
 * /followingInstructors/{id}:
 *   put:
 *     summary: Update a following instructor
 *     tags: [FollowingInstructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: FollowingInstructor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowingInstructor'
 *     responses:
 *       200:
 *         description: Following instructor updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowingInstructor'
 *       404:
 *         description: FollowingInstructor not found
 *       500:
 *         description: Server error
 */
const updateFollowingInstructor = async (req,res) => {
  try {
    const {id} = req.params;
    const followingInstructor = await FollowingInstructor.findByIdAndUpdate(id, req.body);

    if (!FollowingInstructor){
      return res.status(404).json({message: "FollowingInstructor not found"});
    }

    const updatedFollowingInstructor = await FollowingInstructor.findById(id);
    res.status(200).json(updatedFollowingInstructor);
  } catch(error){
    res.status(500).json({message: error.message});
  }
}

//Delete
/**
 * @swagger
 * /followingInstructors/{id}:
 *   delete:
 *     summary: Delete a following instructor
 *     tags: [FollowingInstructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: FollowingInstructor ID
 *     responses:
 *       200:
 *         description: FollowingInstructor deleted
 *       404:
 *         description: FollowingInstructor not found
 *       500:
 *         description: Server error
 */
const deleteFollowingInstructor = async (req,res) => {
  try {
    const {id} = req.params;
    const followingInstructor = await FollowingInstructor.findByIdAndUpdate(id);

    if(!followingInstructor){
      return res.status(404).json({message: "FollowingInstructor not found"})
    }
    res.status(200).json({message: "FollowingInstructor deleted successfully"})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}

async function rankFollowingInstructors(req, res) {
  try {
    const rankedInstructors = await FollowingInstructor.aggregate([
      {
        // Group by instructorId and count the number of followers
        $group: {
          _id: "$instructorId",
          followerCount: { $sum: 1 }, // Count each occurrence of instructorId
        },
      },
      {
        // Sort the results by followerCount in descending order
        $sort: { followerCount: -1 },
      },
      {
        // Lookup to fetch instructor details from the Instructors collection
        $lookup: {
          from: "Instructors", // Name of the Instructors collection
          localField: "_id", // _id is the instructorId from the group stage
          foreignField: "_id", // Match with the _id in the Instructors collection
          as: "instructorDetails", // The output array containing instructor info
        },
      },
      {
        // Unwind the instructor details to convert array into object
        $unwind: "$instructorDetails",
      },
    ]);
    res.status(200).json(rankedInstructors);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
}

module.exports = {
  getFollowingInstructors,
  getFollowingInstructor,
  createFollowingInstructor,
  updateFollowingInstructor,
  deleteFollowingInstructor,
  getFollowingInstructorsByLearnerID,
  rankFollowingInstructors
}