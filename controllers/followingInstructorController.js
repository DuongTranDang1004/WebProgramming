const FollowingInstructor = require("../models/followingInstructorModel");

//Get all
const getFollowingInstructors = async (req,res) => {
  try {
    const followingInstructors = await FollowingInstructor.find({});
    res.status(200).json(followingInstructors)
  } catch(error){
    res.status(500).json({ message: error.message})
  }
}

//Get by ID
const getFollowingInstructor = async (req,res) => {
  try {
    const {id} = req.param;
    const followingInstructor = await FollowingInstructor.findById(id);
    res.status(200).json(followingInstructor)
  } catch(error){
    res.status(500).json({ message: error.message})
  }
}


//Create
const createFollowingInstructor = async (req,res) => {
  try {
    const followingInstructor = await FollowingInstructor.create(req.body);
    res.status(200).json(FollowingInstructor)
  } catch (error){
    res.status(500).json({message: error.message})
  }
}

//Update
const updateFollowingInstructor = async (req,res) => {
  try {
    const {id} = req.param;
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
const deleteFollowingInstructor = async (req,res) => {
  try {
    const {id} = req.param;
    const followingInstructor = await FollowingInstructor.findByIdAndUpdate(id);

    if(!followingInstructor){
      return res.status(404).json({message: "FollowingInstructor not found"})
    }
    res.status(200).json({message: "FollowingInstructor deleted successfully"})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}
module.exports = {
  getFollowingInstructors,
  getFollowingInstructor,
  createFollowingInstructor,
  updateFollowingInstructor,
  deleteFollowingInstructor
}