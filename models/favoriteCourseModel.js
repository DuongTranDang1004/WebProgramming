const mongoose = require('mongoose');

// Define the schema for the FavoriteCourses collection
const FavoriteCourseSchema = new mongoose.Schema({
  learnerId: {
    type: Number,
    required: true,
    ref: 'Learner' 
  },
  courseId: {
    type: Number,
    required: true,
    ref: 'Course' 
  }
});

// Create the model for the FavoriteCourses schema
const FavoriteCourse = mongoose.model('FavoriteCourse', FavoriteCourseSchema);
module.exports = FavoriteCourse;
