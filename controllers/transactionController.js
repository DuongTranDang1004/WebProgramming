const Transaction = require("../models/transactionModel");
const Learner = require("../models/learnerModel");
const Course = require("../models/courseModel");
const BoughtCourse = require("../models/boughtCourseModel");

/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: API for managing transactions
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Transaction:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the transaction
 *        learnerId:
 *          type: string
 *          description: The ID of the learner who made the transaction
 *        totalAmount:
 *          type: number
 *          description: The total amount of the transaction
 *        transactionDate:
 *          type: string
 *          format: date-time
 *          description: The date the transaction was made
 *        paymentMethod:
 *          type: string
 *          description: The payment method used in the transaction
 *          enum:
 *            - VISA
 *            - Mastercard
 *            - Bank Transfer
 *            - Momo
 *        transactionItems:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              courseId:
 *                type: string
 *                description: The ID of the course purchased
 *              certificateName:
 *                type: string
 *                description: The name of the certificate (if any)
 *              certificatePrice:
 *                type: number
 *                description: The price of the certificate (if any)
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Server error
 */
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate({
        path: "learnerId",
        select: "firstName lastName email",
      })
      .populate({
        path: "transactionItems.courseId",
        select: "name category price",
      });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: The transaction details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate({
        path: "learnerId",
        select: "firstName lastName email",
      })
      .populate({
        path: "transactionItems.courseId",
        select: "name category price",
      });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction and associated bought courses
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction and bought courses created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request
 */
const createTransaction = async (req, res) => {
  try {
    // Validate learner and course IDs before creating a transaction
    const learner = await Learner.findById(req.body.learnerId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    // Validate each course in transactionItems
    const transactionItems = req.body.transactionItems;
    for (const item of transactionItems) {
      const course = await Course.findById(item.courseId);
      if (!course) {
        return res
          .status(404)
          .json({ message: `Course not found for ID: ${item.courseId}` });
      }
    }

    // Create the transaction
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();

    // For each transaction item, create a corresponding bought course
    const boughtCoursesPromises = transactionItems.map(async (item) => {
      const boughtCourse = new BoughtCourse({
        learnerId: req.body.learnerId,
        courseId: item.courseId,
        instructorId: (await Course.findById(item.courseId)).instructorId, // Get instructorId from course
        startDate: new Date(),
        boughtDateTime: new Date(),
        courseCompletionStatus: false, // Default to not completed
        isCertificate: !!item.certificateName, // If there's a certificate, mark as true
      });

      return boughtCourse.save();
    });

    // Wait for all bought courses to be saved
    await Promise.all(boughtCoursesPromises);

    // Respond with the created transaction and bought courses
    res.status(201).json({
      transaction: savedTransaction,
      message: "Transaction and associated bought courses created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all transaction by learner id

/**
 * @swagger
 * /api/transactions/learner/{learnerId}:
 *   get:
 *     summary: Get transactions by learner ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: learnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the learner to get transactions for
 *     responses:
 *       200:
 *         description: List of transactions for the specified learner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: No transactions found for the specified learner
 *       500:
 *         description: Server error
 */
const getTransactionsByLearnerId = async (req, res) => {
  const { learnerId } = req.params; // Get learnerId from request parameters

  try {
    const transactions = await Transaction.find({ learnerId }); // Find transactions by learnerId
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this learner" });
    }
    res.status(200).json(transactions); // Send the list of transactions as a JSON response
  } catch (error) {
    console.error("Error fetching transactions by learner ID:", error);
    res.status(500).json({ message: "Server error" }); // Send an error message if something goes wrong
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  getTransactionsByLearnerId,
};
