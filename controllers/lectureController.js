const Lecture = require("../models/lectureModel")

//Get all
const getLectures = async (req,res) => {
    try {
        const lectures = await Lecture.find({});
        res.status(200).json({lectures});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Get by ID
const getLecture = async (req,res) => {
    try {
        const {id} = req.params;
        const lecture = await Lecture.findById(id);
        res.status(200).json({lecture});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Create
const createLecture = async (req,res) => {
    try {
        const lecture = await Lecture.create(req.body);
        res.status(200).json({lecture});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Update
const updateLecture = async (req, res) => {
    try {
        const {id} = req.params;
        const lecture = await Lecture.findByIdAndUpdate(id);;

        if(!lecture){
            return res.status(404).json({message: "Lecture not found"});
        }
        const updatedLecture = await Lecture.findById(id);
        res.status(200).json({updatedLecture});
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//Delete
const deleteLecture = async (req,res) => {
    try {
        const {id} = req.params;
        const lecture = await Lecture.findByIdAndDelete(id);

        if(!lecture){
            return res.status(404).json({message: "Lecture not found"});
        }
        res.status(200).json({message: "Lecture deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getLecture,
    getLectures,
    createLecture,
    updateLecture,
    deleteLecture
}