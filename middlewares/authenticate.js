const Instructor = require("../models/instructorModel")
const PlatformAdmin = require("../models/platformAdminModel")
const Learner = require("../models/learnerModel")

async function authenticateMiddleware(req, res, next) {
    res.locals.authenticated = false;
    // Check if authenticate header exist
    if (!req.headers.authentication) {
        return next();
    }
    // In case authenticate header exist
    const token = req.headers.authentication;
    // Search for token in instructor
    const instructor = await Instructor.findOne({ token: token });
    if (instructor) {
        res.locals.authenticated = true;
        res.locals.role = "instructor";
        res.locals.instructor = instructor;
        return next();
    }
    // Search for token in platform admin
    const admin = await PlatformAdmin.findOne({ token: token });
    if (admin) {
        res.locals.authenticated = true;
        res.locals.role = "admin";
        res.locals.admin = admin;
        return next();
    }
    //Search for token in leaner
    const learner = await Learner.findOne({token: token});
    if (learner) {
        res.locals.authenticated=true;
        res.locals.role = "learner";
        res.locals.learner = learner;
        return next();
    }
    return next();
}

module.exports = authenticateMiddleware;