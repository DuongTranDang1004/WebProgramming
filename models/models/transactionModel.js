const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
    learnerId: {
        type: String,
        ref: 'Learners',
        required: true
    },
    courseId: {
        type: String,
        ref: 'Courses',
        required: true
    },
    amount: {
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
            "Momo"
        ]
    }
}, { collection: "Transactions" });

const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports = Transactions;
