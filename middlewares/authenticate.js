const Instructor = require("../models/instructorModel")
const PlatformAdmin = require("../models/platformAdminModel")
const Learner = require("../models/learnerModel")

async function authenticateMiddleware(req, res, next) {
    res.locals.authenticated = false;
    // Check if authenticate header exist
    if (!req.headers.authorization) {
        return next();
    }
    // In case authenticate header exist
    const token = req.headers.authorization;
    // Search for token in instructor
    const instructor = await Instructor.find({ token: token });
    if (instructor.length > 0) {
        res.locals.authenticated = true;
        res.locals.role = "instructor";
        res.locals.instructor = instructor[0];
        return next();
    }
    // Search for token in platform admin
    const admin = await PlatformAdmin.find({ token: token });
    if (admin > 0) {
        res.locals.authenticated = true;
        res.locals.role = "admin";
        res.locals.admin = admin[0];
        return next();
    }
    //Search for token in leaner
    const learner = await Learner.find({token: token});
    if (learner > 0) {
        res.locals.authenticated=true;
        res.locals.role = "learner";
        res.locals.learner = learner[0];
        return next();
    }
    return next();
}

module.exports = authenticateMiddleware;