// models/courseModel.js

const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({

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


const Courses = mongoose.model("Courses", CoursesSchema, "Courses");

module.exports = Courses;
