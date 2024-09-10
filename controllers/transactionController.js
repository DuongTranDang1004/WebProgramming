const Transactions = require("../models/transactionModel");
const BoughtCourses = require("../models/boughtCourseModel");
const mongoose = require("mongoose");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transactions:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the transaction
 *           example: "64e1a5f9f5e1a5f9f5e1a5f9"
 *         learnerId:
 *           type: string
 *           description: The ID of the learner
 *           example: "64e1a5f9f5e1a5f9f5e1a5f9"
 *         courseId:
 *           type: string
 *           description: The ID of the course
 *           example: "64e1a5f9f5e1a5f9f5e1a5f9"
 *         amount:
 *           type: number
 *           description: The price of the course mentioned in the transaction
 *           example: 99.99
 *         transactionDate:
 *           type: string
 *           format: date-time
 *           description: The date of the transaction
 *           example: "2024-08-15T10:00:00Z"
 *         paymentMethod:
 *           type: string
 *           description: The method for payment
 *           example: "Momo"
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
 *                 $ref: '#/components/schemas/Transactions'
 *       500:
 *         description: Server error
 */
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.find({})
      .populate('learnerId', 'firstName lastName email')
      .populate('courseId', 'name category price'); // Populate course data
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/transactions/user/{userId}:
 *   get:
 *     summary: Get all transactions for a specific user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of transactions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transactions'
 *       500:
 *         description: Server error
 */
const getTransactionsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transactions.find({ learnerId: userId })
      .populate('learnerId', 'firstName lastName email')
      .populate('courseId', 'name category price'); // Populate course data

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found for this user" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transactions'
 *           example:
 *             learnerId: "64e1a5f9f5e1a5f9f5e1a5f9"
 *             courseId: "64e1a5f9f5e1a5f9f5e1a5f9"
 *             amount: 99.99
 *             transactionDate: "2024-08-15T10:00:00Z"
 *             paymentMethod: "Momo"
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transactions'
 *       400:
 *         description: Bad request
 */
const createTransaction = async (req, res) => {
  const { learnerId, courseId, instructorId, amount, transactionDate, paymentMethod } = req.body;

  try {
    // Create the transaction
    const transaction = new Transactions({
      learnerId,
      courseId,
      instructorId,
      amount,
      transactionDate,
      paymentMethod,
    });

    await transaction.save();

    // Automatically create a row in the BoughtCourses model after a transaction
    const boughtCourse = new BoughtCourses({
      learnerId,
      courseId,
      instructorId, // You might want to add this field
      startDate: transactionDate,
      boughtDateTime: transactionDate,
      endDate: null,
      courseCompletionStatus: false,
      isCertificate: false,
    });

    await boughtCourse.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
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
 *         description: The transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transactions'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
const getTransactionsById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transactions.findById(id)
      .populate('learnerId', 'firstName lastName email')
      .populate('courseId', 'name category price'); // Populate course data

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  getTransactionsByUserId,
  createTransaction,
  getTransactionsById,
};
