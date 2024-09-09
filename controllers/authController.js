const PlatformAdmin = require("../models/platformAdminModel");
const Instructor = require("../models/instructorModel");
const Learner = require("../models/learnerModel");
const { createToken } = require("../utils/factory")

//login
async function login(req, res) {
    const { email, password } = req.body;
    // Check if the learner exists
    // For some fucking reason, Leaner.findOne(req.body) do not work.
    // And also the same for Instructor and Admin
    const learners = await Learner.find({});
    let foundLearner = null;
    learners.forEach(learner => {
        if (learner.email === email && learner.password === password) {
            foundLearner = learner;
        }
    });
    if (foundLearner) {
        // Check if learner is already has a token
        if (foundLearner.token) {
            return res.status(200).json({
                token: foundLearner.token,
                learner: foundLearner
            });
        } else {
            // Create a token for the learner
            const token = createToken();
            foundLearner.token = token;
            foundLearner.save();
            return res.status(200).json({
                token,
                learner: foundLearner
            });
        }
    }
    // Check if the instructor exists
    let foundInstructor = null;
    (await Instructor.find({})).forEach(instructor => {
        if (instructor.email === email && instructor.password === password)
            foundInstructor = instructor;
    });
    if (foundInstructor) {
        // Check if instructor is already has a token
        if (foundInstructor.token) {
            return res.status(200).json({
                token: foundInstructor.token,
                instructor: foundInstructor
            });
        } else {
            // Create a token for the instructor
            const token = createToken();
            foundInstructor.token = token;
            foundInstructor.save();
            return res.status(200).json({
                token,
                instructor: foundInstructor
            });
        }
    }
    // Finally, check if the admin exists
    let foundAdmin = null;
    (await PlatformAdmin.find({})).forEach(admin => {
        if (admin.email === email && admin.password === password)
            foundAdmin = admin;
    });
    if (foundAdmin) {
        // Check if admin is already has a token
        if (foundAdmin.token) {
            return res.status(200).json({
                token: foundAdmin.token,
                admin: foundAdmin
            });
        } else {
            // Create a token for the admin
            const token = createToken();
            foundAdmin.token = token;
            foundAdmin.save();
            return res.status(200).json({
                token,
                admin: foundAdmin
            });
        }
    }
    return res.status(401).json({
        message: "Invalid email or password"
    });
}

//register

//forgot password

//remember to add swaggerUI annotation

module.exports = {
    login
}