const express = require("express");
const {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  getTransactionsByLearnerId,
} = require("../controllers/transactionController");

const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *       500:
 *         description: Server error
 */
router.get("/", getTransactions);

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
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTransaction);

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
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createTransaction);

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
router.delete("/:id", deleteTransaction);

/**
 * @swagger
 * /api/transactions/learner/{learnerId}:
 *   get:
 *     summary: Get transactions by learner ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: learnerId
 *         schema:
 *           type: string
 *         required: true
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
router.get("/learner/:learnerId", getTransactionsByLearnerId);

module.exports = router;
