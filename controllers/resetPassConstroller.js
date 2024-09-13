const Instructor = require("../models/instructorModel");
const Learners = require("../models/learnerModel");
const PlatformAdmins = require("../models/platformAdminModel");

const resetPass = async (req,res) => {
    try {
        const { forgetToken, newPass } = req.body;
        
        let user;

        const instructor = await Instructor.findOne({ "forget": forgetToken });
        if (instructor) {
            user = instructor;
        }

        // Check if the email exists in the Learners collection
        const learner = await Learners.findOne({ "forget": forgetToken });
        if (learner) {
            user = learner;
        }

        // Check if the email exists in the PlatformAdmins collection
        const admin = await PlatformAdmins.findOne({ "forget": forgetToken });
        if (admin) {
            user = admin;
        }

        if(!user){
            return res.status(404).json({message: "Cannot find the match user",});
        };
            

        //Change new pass
        user.password = newPass;
        await user.save();
        console.log(user);

        return res.status(200).json({message: "Change password successfully"});
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
}

module.exports = { resetPass };