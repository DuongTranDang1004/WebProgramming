const express = require('express');
const router = express.Router();
const {
  getTransactions,           // Get all transactions
  getTransactionsByUserId,    // Get transactions by a specific user
  createTransaction,          // Create a new transaction
  getTransactionsById         // Get transaction by ID
} = require('../controllers/transactionController');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
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
router.get('/', getTransactions);

/**
 * @swagger
 * /api/transactions/user/{userId}:
 *   get:
 *     summary: Get all transactions of a specific user
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
router.get('/user/:userId', getTransactionsByUserId);

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
router.post('/', createTransaction);

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
router.get('/:id', getTransactionsById);

module.exports = router;
