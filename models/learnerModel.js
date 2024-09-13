// models/Learners.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LearnersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: [
            {
              validator: function(value) {
                // Ensure password is at least 8 characters
                return value.length >= 8;
              },
              message: 'Password must be at least 8 characters long'
            },
            {
              validator: function(value) {
                // Ensure password contains at least one uppercase letter
                return /[A-Z]/.test(value);
              },
              message: 'Password must contain at least one uppercase letter'
            },
            {
              validator: function(value) {
                // Ensure password contains at least one digit
                return /\d/.test(value);
              },
              message: 'Password must contain at least one digit'
            },
            {
              validator: function(value) {
                // Ensure password is not the same as the email
                return value !== this.email;
              },
              message: 'Password cannot be the same as the email address'
            }
          ],
        trim: true,

    },
    profilePicture: {
        type: String,
        required: false,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please enter a valid URL for the image'],
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
        required: false,
        min: [4, 'Zipcode must be at least 4'],
        max: [6, 'Zipcode must not exceed 6'],
        trim: true
    },
    country: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    token: {
        type: String,
        default: null,
        required: false
      },
    createdTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    forget: {
      type: String,
      default: null,
      require: false
    }
}, { collection: "Learners" });

// Create a model using the schema
const Learners = mongoose.model('Learners', LearnersSchema, 'Learners');

module.exports = Learners;
