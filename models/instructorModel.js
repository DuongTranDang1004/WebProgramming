const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema(
    {   _id: Number,
        email: {
            type: String,
            required: true
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
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: false,
        },

        city: {
            type: String,
            required: false,
        },

        zipcode: {
            type: String,
            required: false,
            min: [4, 'Zipcode must be at least 4'],
            max: [6, 'Zipcode must not exceed 6'],
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        schoolOrCompanyName: {
            type: String,
            required: false,
            trim: true
        },

        jobTitle: {
            type: String,
            required: false,
            trim: true
        },

        specialization: {
            type: String,
            enum: ['front-end', 'back-end', 'data science', 'AI', 'cyber security', 'testing'],
            required: false
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
            required: true
        },

        membershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Membership",
            required: true
        },
        createTime: {
          type: Date,
          require: true,
          default: Date.now
        },
        Bio: {
          type: String,
          require: false,
        }

    }
)

const Instructor = mongoose.model("Instructors", InstructorSchema, "Instructors");

module.exports = Instructor;



