// models/BoughtCourses.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoughtCoursesSchema = new Schema({
    _id: {
      type: Number,  // Use Number since your _id is numeric
      required: true
    },
    learnerId: {
      type: Number,
      required: true
    },
    courseId: {
      type: Number,
      required: true
    },
    boughtDateTime: {
      type: Date,
      required: true,
      default: Date.now
    },
    lectureCompletionStatus: [
      {
        lectureId: {
          type: Number,
          required: true
        },
        completeStatus: {
          type: Boolean,
          required: true
        }
      }
    ],
    completionDateTime: {
      type: Date,
      required: false
    },
    generateCertificate: {
      type: Boolean,
      required: true,
      default: false
    }
  }, {collection: "BoughtCourses"});

// Create a model using the schema
const BoughtCourses = mongoose.model('BoughtCourses', BoughtCoursesSchema);

module.exports = BoughtCourses;
