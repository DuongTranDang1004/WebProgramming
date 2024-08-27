// models/courseModel.js

const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
  _id: {
    type: Number,  // Use Number since your _id is numeric
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "front-end",
      "back-end",
      "data science",
      "AI",
      "cyber security",
      "testing",
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
});


const Course = mongoose.model("Courses", CourseSchema, "Courses");

module.exports = Courses;
