const Instructor = require("../models/instructorModel");
const Learners = require("../models/learnerModel");
const PlatformAdmins = require("../models/platformAdminModel");
const { createToken } = require("../utils/factory");

const forgetPass = async (req, res) => {
    try {
        const { email } = req.body;

        let user, userType, userId;

        // Check if the email exists in the Instructors collection
        const instructor = await Instructor.findOne({ "email": email });
        if (instructor) {
            user = instructor;
            userId = instructor._id;
            userType = "Instructor";
        }

        // Check if the email exists in the Learners collection
        const learner = await Learners.findOne({ "email": email });
        if (learner) {
            user = learner;
            userId = learner._id;
            userType = "Learner";
        }

        // Check if the email exists in the PlatformAdmins collection
        const admin = await PlatformAdmins.findOne({ "email": email });
        if (admin) {
            user = admin;
            userId = admin._id;
            userType = "Admin";
        }

        // If email not found in any collection
        if (!user || !userType) {
            return res.status(404).json({
                message: "Email not found in any user type",
            });
        }

        // Create new token
        const newToken = createToken()
         // Update the user's token field and save
         user.forget = newToken;
         await user.save();
 
         // Respond with the updated token
         return res.status(200).json({
             message: `Email found in ${userType}`,
             userType: userType,
             userId: user._id,
             forget: newToken
         });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
};

module.exports = { forgetPass };