const Instructor = require("../models/instructorModel");

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