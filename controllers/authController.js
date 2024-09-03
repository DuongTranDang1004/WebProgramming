const PlatformAdmin = require("../models/platformAdminModel");
const Instructor = require("../models/instructorModel");
const Learner = require("../models/learnerModel");
const { createToken } = require("../utils/factory")

//login
async function login(req, res) {
    // Check if email and password is parsed in data
    if (!req.body.email || !req.body.password) {
        res.status(400).json({message: "Missing required fields."});
        return;
    }
    // Find admin if match the email and password
    const admin = await PlatformAdmin.findOne({ email: req.body.email, password: req.body.password });
    if (admin) {
        if (!admin.token) {
            admin.token = createToken();
            await admin.save();
        } 
        res.status(200).json(admin);
        return;
    }
    // 
}

//register

//forgot password

//remember to add swaggerUI annotation
