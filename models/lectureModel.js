const mongoose = require('mongoose');

// Define the schema for the Lectures collection
const LectureSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course' 
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  video: {
    type: String,
    required: false,
    trim: true
  },
  exercise: {
    type: {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true }
    },
    required: false
  }
});

// Create the model for the Lectures schema
const Lecture = mongoose.model('Lecture', LectureSchema);
module.exports = Lecture;