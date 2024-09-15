const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  learnerId: {
    type: String,
    ref: 'Learners',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0 // Ensure that the transaction amount cannot be negative
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now // Ensure that the date is set to the current time if not provided
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: [
      "VISA",
      "Mastercard",
      "Bank Transfer",
      "Momo",
      "PayPal"
    ]
  },
  transactionItems: [
    {
        courseId: {
            type: String,
            ref: 'Courses',
            required: true
        },
        certificateName: {
            type: String,
            required: false
        },
        certificatePrice: {
            type: Number,
            required: false,
            min: 0,
            default: 0
        }
    }
  ]
}, { collection: 'Transactions' });

const Transaction = mongoose.model('Transactions', transactionSchema);

module.exports = Transaction;