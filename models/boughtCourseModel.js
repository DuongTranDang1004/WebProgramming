// models/BoughtCourses.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoughtCoursesSchema = new Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,  // Use Number since your _id is numeric
      required: true
    },
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Learners',
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses',
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
          type: String,
          ref: 'Lectures',
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
