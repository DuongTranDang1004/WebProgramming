// models/courseModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
const CoursesSchema = new mongoose.Schema({
  _id: {
    type: Number,  // Use Number since your _id is numeric
    required: true
  },
=======
const CourseSchema = new mongoose.Schema({
  _id: Number,
>>>>>>> origin/Doan-UI
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
    type: Number,
    ref: "Instructor",
    required: true,
  },
});


<<<<<<< HEAD
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
=======
const Course = mongoose.model("Courses", CourseSchema, "Courses");
>>>>>>> origin/Doan-UI

module.exports = Courses;
