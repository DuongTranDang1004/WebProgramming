const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    planName: {
        type: String,
        enum: ['Basic', 'Saving', 'Premium'],
        default: 'Basic',
        required: true
    },
    planType: {
        type: String,
        enum: ['Monthly', 'Yearly'],
        required: false,
    },
    commissionFee: {
        type: Number,
        required: true,
        min: 0,
        default: function() {
            switch (this.planName) {
                case 'Saving':
                    return 5;
                case 'Premium':
                    return 2;
                // Add other cases as needed
                default:
                    return 0;
            }
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: function() {
            if (this.planName === 'Saving') {
                if (this.planType === 'Monthly') {
                    return 20;
                } else if (this.planType === 'Yearly') {
                    return 200;
                }
            } else if (this.planName === 'Premium') {
                if (this.planType === 'Monthly') {
                    return 30;
                } else if (this.planType === 'Yearly') {
                    return 300;
                }
            }
            return 0;
        }
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
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
        required: false
    },
    cardNumber: {
        type: String,
        required: function () { return this.paymentMethod === 'Card'; }
    }
})

const Membership = mongoose.model("Membership", membershipSchema, "Membership");

module.exports = Membership;