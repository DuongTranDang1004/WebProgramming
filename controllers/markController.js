const mongoose = require("mongoose")
const BoughtCourse = require("../models/boughtCourseModel")
const Lecture = require("../models/lectureModel")

// Function to mark lecture as complete
async function markLectureComplete(req, res) {
    try {
      const { boughtCourseId, lectureId, userAnswer } = req.body;
  
      // Find the lecture details
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
      }
  
      // Check if the user's answer is correct
      if (lecture.exercise.correctAnswer !== userAnswer) {
        return res.status(400).json({ message: 'Incorrect answer' });
      }
  
      // Find the bought course
      const boughtCourse = await BoughtCourse.findById(boughtCourseId);
      if (!boughtCourse) {
        return res.status(404).json({ message: 'Bought course not found' });
      }
  
      // Update the lecture completion status for the specific lecture
      let lectureCompletionUpdated = false;
      boughtCourse.lectureCompletionStatus.forEach((lectureStatus) => {
        if (lectureStatus.lectureId.toString() === lectureId.toString()) {
          lectureStatus.completeStatus = true;
          lectureCompletionUpdated = true;
        }
      });

      // Push into the lectureCompletionStatus
      boughtCourse.lectureCompletionStatus.push({
        lectureId: lectureId,
        completeStatus: true,
      })

      // Check if all lectures are complete
      const allLecturesComplete = boughtCourse.lectureCompletionStatus.every(
        (lectureStatus) => lectureStatus.completeStatus
      );
  
      if (allLecturesComplete) {
        boughtCourse.completionDateTime = new Date();
      }
  
      // Save the updated bought course
      await boughtCourse.save();
  
      res.status(200).json({ message: 'Lecture marked as complete', boughtCourse });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  }
  
  module.exports = {
    markLectureComplete
  };