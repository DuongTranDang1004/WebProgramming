const Membership = require("../models/membershipModel");

//Create 
const createMembership = async (req,res) => {
    try{
        const membership = await Membership.create(req.body);
        res.status(200).json(instructor)
    }catch (error){
    res.status(500).json({message: error.message})
    }
}

//Get membership by instructorId

const getMembershipsByInstructorID = async (req,res) => {
    try{
        const {id} = req.params;
        const memberships = await Membership.find({instructorId: id});
        if (memberships.length > 0) {
            return res.status(200).json(memberships);
        }else {
            return res.status(200).json({ message: "This account is not a membership" });
        }
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    createMembership,
    getMembershipsByInstructorID
}