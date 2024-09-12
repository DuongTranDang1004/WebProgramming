const BoughtCourse = require('../models/boughtCourseModel');
const Transaction = require('../models/transactionModel');
const Course = require('../models/courseModel');
const mongoose = require('mongoose');

/**
 * @swagger
 * /api/cart/purchase:
 *   post:
 *     summary: Purchase courses from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               learnerId:
 *                 type: string
 *                 required: true
 *               courses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     courseId:
 *                       type: string
 *                     certificateName:
 *                       type: string
 *                     certificatePrice:
 *                       type: number
 *                     paymentMethod:
 *                       type: string
 *                       enum: ["VISA", "Mastercard", "Bank Transfer", "Momo"]
 *     responses:
 *       201:
 *         description: Courses purchased successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const purchaseCart = async (req, res) => {
  const { learnerId, courses, paymentMethod } = req.body;

  // Validate input
  if (!learnerId || !Array.isArray(courses) || courses.length === 0 || !paymentMethod) {
    return res.status(400).json({ message: 'learnerId, courses, and paymentMethod are required' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transactionItems = [];
    let totalAmount = 0;

    // Validate each course and calculate total amount
    for (const course of courses) {
      const { courseId, certificateName, certificatePrice } = course;
      const courseDetails = await Course.findById(courseId);

      if (!courseDetails) {
        throw new Error(`Course not found for ID: ${courseId}`);
      }

      // Calculate the total price for the transaction, including the course price and optional certificate price
      totalAmount += courseDetails.price;
      if (certificatePrice) {
        totalAmount += certificatePrice;
      }

      // Add transaction item
      transactionItems.push({
        courseId,
        certificateName: certificateName || null,
        certificatePrice: certificatePrice || 0,
      });
    }

    // Create a new Transaction entry
    const transaction = new Transaction({
      learnerId,
      totalAmount,
      paymentMethod,
      transactionItems,
    });

    const savedTransaction = await transaction.save({ session });

    // Create BoughtCourse entries for each course in the cart
    const boughtCoursesPromises = courses.map(async (course) => {
      const { courseId, certificateName } = course;
      const boughtCourse = new BoughtCourse({
        learnerId,
        courseId,
        instructorId: (await Course.findById(courseId)).instructorId,
        startDate: new Date(),
        boughtDateTime: new Date(),
        courseCompletionStatus: false, // Default to not completed
        isCertificate: !!certificateName, // If there's a certificate, mark as true
      });
      return boughtCourse.save({ session });
    });

    // Wait for all bought courses to be saved
    await Promise.all(boughtCoursesPromises);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: 'Courses purchased successfully',
      transaction: savedTransaction,
    });
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { purchaseCart };
