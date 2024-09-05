// models/courseModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
const CoursesSchema = new mongoose.Schema({

=======
const CourseSchema = new mongoose.Schema({
  _id: Number,
>>>>>>> origin/Cuong-UI
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
  createTime: {
    type: Date,
    default: Date.now  // Automatically sets the current date and time when a new document is created
  },
  isPublish: {
    type: Boolean,
    default: false,
    validate: {
      validator: function(value) {
        // Prevent changing isPublish from true to false
        if (this.isPublish && !value) {
          return false;
        }
        return true;
      },
      message: "isPublish cannot be set to false once it has been set to true"
    }
  }
});

<<<<<<< HEAD

const Courses = mongoose.model("Courses", CoursesSchema, "Courses");
=======
const Courses = mongoose.model("Courses", CourseSchema, "Courses");
>>>>>>> origin/Cuong-UI

module.exports = Courses;
