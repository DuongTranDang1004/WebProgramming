const mongoose = require('mongoose');

// Define the schema for the FavoriteCourses collection
const FavoriteCourseSchema = new mongoose.Schema({
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Learners' 
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Courses' 
  }
});

// Create the model for the FavoriteCourses schema
const FavoriteCourse = mongoose.model('FavoriteCourses', FavoriteCourseSchema, 'FavoriteCourses');
module.exports = FavoriteCourse;
