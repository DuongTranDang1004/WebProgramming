// models/Intructors.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorsSchema = new Schema({
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
    },
    schoolOrCompanyName: {
        type: String,
        require: true
    },
    jobTitle: {
        type: String,
        require: true
    },
    specialization: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
    },
    membership: {
        type: String,
        require: true,
    }

}, { collection: "Instructors" });

// Create a model using the schema
const Instructors = mongoose.model('Instructors', InstructorsSchema);

module.exports = Instructors;
