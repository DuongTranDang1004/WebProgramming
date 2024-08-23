const mongoose = require("mongoose")

//Define schema for FollowingInstructor collection
const FollowingInstructorSchema = new mongoose.Schema({
    learnerId: {
        type: Number,
        required: true,
        ref: 'Learners' 
    },
    instructorId: {
        type: Number,
        required: true,
        ref: 'Instructors' 
    }
})

//Create the model for Followeinginstructor schema

const FollowingInstructor = mongoose.model('FollowingInstructors', FollowingInstructorSchema, 'FollowingInstructors')

module.exports = FollowingInstructor