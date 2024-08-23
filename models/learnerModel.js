// models/Learners.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LearnersSchema = new Schema({
    _id: {
        type: Number,  // Use Number since your _id is numeric
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    zipcode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
}, { collection: "Learners" });

// Create a model using the schema
const Learners = mongoose.model('Learners', LearnersSchema, 'Learners');

module.exports = Learners;
