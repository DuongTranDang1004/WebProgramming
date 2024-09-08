const BoughtCourse = require('../models/boughtCourseModel');
const Transaction = require('../models/transactionModel');
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
 *                     amount:
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
  const { learnerId, courses } = req.body;

  if (!learnerId || !Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ message: 'learnerId and courses are required' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const boughtCourses = [];
    const transactions = [];

    for (const course of courses) {
      const { courseId, amount, paymentMethod } = course;

      // Create a new BoughtCourse entry
      const boughtCourse = new BoughtCourses({
        learnerId,
        courseId,
        instructorId: course.instructorId, // Assuming course has instructorId info
        startDate: Date.now(),
        boughtDateTime: Date.now(),
        courseCompletionStatus: false,
        isCertificate: false,
      });

      await boughtCourse.save({ session });

      // Create a new Transaction entry
      const transaction = new Transactions({
        learnerId,
        courseId,
        amount,
        paymentMethod,
        transactionDate: Date.now(),
      });

      await transaction.save({ session });

      boughtCourses.push(boughtCourse);
      transactions.push(transaction);
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: 'Courses purchased successfully',
      boughtCourses,
      transactions,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { purchaseCart };