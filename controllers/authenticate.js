const Learner = require("../models/learnerModel");
const Instructor = require("../models/instructorModel");
const Admin = require("../models/platformAdminModel");
const { v4 } = require('uuid');
const sha256 = require('crypto-js/sha256');

const createToken = () => {
    return sha256(v4()).toString();
}

const authenticate = async (req, res) => {
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
                token: foundLearner.token
            });
        } else {
            // Create a token for the learner
            const token = createToken();
            foundLearner.token = token;
            foundLearner.save();
            return res.status(200).json({
                token
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
                token: foundInstructor.token
            });
        } else {
            // Create a token for the instructor
            const token = createToken();
            foundInstructor.token = token;
            foundInstructor.save();
            return res.status(200).json({
                token
            });
        }
    }
    // Finally, check if the admin exists
    let foundAdmin = null;
    (await Admin.find({})).forEach(admin => {
        if (admin.email === email && admin.password === password)
            foundAdmin = admin;
    });
    if (foundAdmin) {
        // Check if admin is already has a token
        if (foundAdmin.token) {
            return res.status(200).json({
                token: foundAdmin.token
            });
        } else {
            // Create a token for the admin
            const token = createToken();
            foundAdmin.token = token;
            foundAdmin.save();
            return res.status(200).json({
                token
            });
        }
    }
    return res.status(401).json({
        message: "Invalid email or password"
    });
}

module.exports = authenticate;