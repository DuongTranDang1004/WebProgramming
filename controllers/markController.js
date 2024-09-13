/**
 * @swagger
 * /lectures/markLecture:
 *   post:
 *     summary: Mark a lecture as complete.
 *     description: Marks the specified lecture as complete for the user after verifying their answer.
 *     tags:
 *       - Lectures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boughtCourseId:
 *                 type: string
 *                 description: The ID of the bought course.
 *                 example: "64c9b7f7b51d894f8bd4e91e"
 *               lectureId:
 *                 type: string
 *                 description: The ID of the lecture being completed.
 *                 example: "64c9b9f5d51d8978bc3e123e"
 *               userAnswer:
 *                 type: string
 *                 description: The user's answer to the exercise in the lecture.
 *                 example: "correctAnswer123"
 *     responses:
 *       200:
 *         description: Lecture marked as complete successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lecture marked as complete"
 *                 boughtCourse:
 *                   $ref: '#/components/schemas/BoughtCourse'
 *       400:
 *         description: Incorrect answer provided by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect answer"
 *       404:
 *         description: Lecture or bought course not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lecture not found"
 *       500:
 *         description: An internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 *                 error:
 *                   type: string
 *                   example: "Error details here"
 */

const mongoose = require("mongoose");
const BoughtCourse = require("../models/boughtCourseModel");
const Lecture = require("../models/lectureModel");

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
    boughtCourse.completedLectures.forEach((lectureStatus) => {
      if (lectureStatus.lectureId.toString() === lectureId.toString()) {
        lectureStatus.completeStatus = true;
        lectureCompletionUpdated = true;
      }
    });

    if (!lectureCompletionUpdated) {
      // Push into the lectureCompletionStatus if not already marked as complete
      boughtCourse.completedLectures.push({
        lectureId: lectureId,
        completeStatus: true,
      });
    }

    //Get all lecture by course id
    const totalLectures = await Lecture.find({ courseId: boughtCourse.courseId });

    // Check if all lectures are complete
    const allLecturesComplete = totalLectures.every((lec) =>
      boughtCourse.completedLectures.some(
        (completedLec) =>
          completedLec.lectureId.toString() === lec._id.toString() &&
          completedLec.completeStatus === true
      )
    );

    boughtCourse.courseCompletionStatus = allLecturesComplete;

    // Save the updated bought course
    await boughtCourse.save();

    res.status(200).json({ message: 'Lecture marked as complete', boughtCourse });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}

module.exports = {
  markLectureComplete,
};
