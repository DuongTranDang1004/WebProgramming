// models/BoughtCourses.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoughtCoursesSchema = new Schema(
  {
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Learners",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    instructorId: {
      // t his will be use to track the Instructor earning stuff
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructors",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    boughtDateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    completedLectures: [
      {
        lectureId: {
          type: String,
          ref: "Lectures",
          required: true,
        },
        completeStatus: {
          type: Boolean,
          required: true,
        },
      },
    ],
    endDate: {
      // use to be completionDateTime
      type: Date,
      required: false,
      default: null,
    },
    courseCompletionStatus: {
      // use to be completionDateTime
      type: Boolean,
      required: true,
      default: false,
    },
    isCertificate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "BoughtCourses" }
);

// Create a model using the schema
const BoughtCourses = mongoose.model("BoughtCourses", BoughtCoursesSchema);

module.exports = BoughtCourses;
