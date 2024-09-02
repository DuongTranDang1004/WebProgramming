const Instructor = require("../models/instructorModel");

/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: API for managing courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
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

//Get all
const getInstructors = async (req,res) => {
  try {
    const instructors = await Instructor.find({});
    res.status(200).json(instructors)
  } catch(error){
    res.status(500).json({ message: error.message})
  }
}

//Get by ID
const getInstructor = async (req,res) => {
  try {
    const {id} = req.params;
    const instructor = await Instructor.findById(id);
    res.status(200).json(instructor)
  } catch(error){
    res.status(500).json({ message: error.message})
  }
}


//Create
const createInstructor = async (req,res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(200).json(instructor)
  } catch (error){
    res.status(500).json({message: error.message})
  }
}

//Update
const updateInstructor = async (req,res) => {
  try {
    const {id} = req.params;
    const instructor = await Instructor.findByIdAndUpdate(id, req.body);

    if (!instructor){
      return res.status(404).json({message: "Instructor not found"});
    }

    const updatedInstructor = await Instructor.findById(id);
    res.status(200).json(updatedInstructor);
  } catch(error){
    res.status(500).json({message: error.message});
  }
}

//Delete
const deleteInstructor = async (req,res) => {
  try {
    const {id} = req.params;
    const instructor = await Instructor.findByIdAndUpdate(id);

    if(!instructor){
      return res.status(404).json({message: "Instructor not found"})
    }
    res.status(200).json({message: "Instructor deleted successfully"})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}
module.exports = {
  getInstructors,
  getInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor
}