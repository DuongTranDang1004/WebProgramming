const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    planType: {
        type: String,
        enum: ['Monthly', 'Yearly'],
        required: true
    },
    commissionFee: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        default: function () {
            const startDate = this.startDate;
            if (this.planType === 'Monthly') {
                return new Date(startDate.setMonth(startDate.getMonth() + 1));
            } else if (this.planType === 'Yearly') {
                return new Date(startDate.setFullYear(startDate.getFullYear() + 1));
            }
        }
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'PayPal'],
        required: true
    },
    cardNumber: {
        type: String,
        required: function () { return this.paymentMethod === 'Card'; }
    }
})

const Membership = mongoose.model("Membership", membershipSchema, "Membership");

module.exports = Membership;