const FavoriteCourse = require("../models/favoriteCourseModel")

//Get all
const getFavoriteCourses = async (req,res) => {
    try {
      const favoritecourses = await FavoriteCourse.find({});
      res.status(200).json(favoritecourses)
    } catch(error){
      res.status(500).json({ message: error.message})
    }
  }
  
  //Get by ID
  const getFavoriteCourse = async (req,res) => {
    try {
      const {id} = req.param;
      const favoritecourse = await FavoriteCourse.findById(id);
      res.status(200).json(favoritecourse)
    } catch(error){
      res.status(500).json({ message: error.message})
    }
  }
  
  
  //Create
  const createFavoriteCourse = async (req,res) => {
    try {
      const favoritecourse = await FavoriteCourse.create(req.body);
      res.status(200).json(favoritecourse)
    } catch (error){
      res.status(500).json({message: error.message})
    }
  }
  
  //Update
  const updateFavoriteCourse = async (req,res) => {
    try {
      const {id} = req.param;
      const favoritecourse = await FavoriteCourse.findByIdAndUpdate(id, req.body);
  
      if (!favoritecourse){
        return res.status(404).json({message: "favoritecourse not found"});
      }
  
      const updatedFavoriteCourse = await FavoriteCourse.findById(id);
      res.status(200).json(updatedFavoriteCourse);
    } catch(error){
      res.status(500).json({message: error.message});
    }
  }
  
  //Delete
  const deleteFavoriteCourse = async (req,res) => {
    try {
      const {id} = req.param;
      const favoritecourse = await FavoriteCourse.findByIdAndUpdate(id);
  
      if(!favoritecourse){
        return res.status(404).json({message: "favoritecourse not found"})
      }
      res.status(200).json({message: "favoritecourse deleted successfully"})
    }catch(error){
      res.status(500).json({message: error.message})
    }
  }
  module.exports = {
    getFavoriteCourses,
    getFavoriteCourse,
    createFavoriteCourse,
    updateFavoriteCourse,
    deleteFavoriteCourse
  }