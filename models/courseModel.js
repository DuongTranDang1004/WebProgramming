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

// Static Methods for CRUD Operations via Moongose and using JS syntax, instead of code SQL syntax

// Get all courses
CoursesSchema.statics.getAllCourses = async function () {
  return await this.find();
};

// Create a new course
CoursesSchema.statics.createCourse = async function (courseData) {
  const course = new this(courseData);
  return await course.save();
};

// Get a course by ID
CoursesSchema.statics.getCourseById = async function (id) {
  return await this.findById(id);
};

// Update a course
CoursesSchema.statics.updateCourse = async function (id, courseData) {
  return await this.findByIdAndUpdate(id, courseData, { new: true });
};

// Delete a course
CoursesSchema.statics.deleteCourse = async function (id) {
  return await this.findByIdAndRemove(id);
};

const Courses = mongoose.model("Courses", CoursesSchema);

module.exports = Courses;
