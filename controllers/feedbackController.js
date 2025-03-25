const Feedback = require('../models/feedbackModel');


//get all feedbackss
const getFeedbacks = async (req , res) =>{
    try {
        const feedback = await feedback.find({});
        res.status(200).json(feedback);
    } catch (error) {
        res.stats(500).json({message:"Server Error", error});
    }
}

//create new feedback

const createFeedback = async( req , res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
        
    } catch (error) {
        res.status(400).json({message:"Invalid Data", error});
        
    }
}

//get a single feedback by ID

const getFeedbackById = async (req , res) =>{
    try {
        const {id} = req.params;
        const feedback = await Feedback.findById(id);
        if(!feedback)
            return res.status(404).json({message:"feedback not found"});
        res.json(feedback);
        
    } catch (error) {
        res.status(500).json({message:"Server Error", error});
    }
}

//update a feedback

const updateFeedback = async (req , res)=>{
    try {
        const {id} = req.params;
        const feedback = await Feedback.findByIdAndUpdate(id , req.body , {new:true});
        if(!feedback)
            return res.status(404).json({message:"feedback not found"});
        res.status(200).json(feedback);
        
    } catch (error) {
        res.status(400).json({message:"Invalid Data", error});
    }
}

//delete a feedback by ID

const deleteFeedback = async (req , res)=>{
    try {
        const {id} = req.params;
        const feedback = await Feedback.findByIdAndDelete(id);
        if(!feedback)
            return res.status(404).json({message:"feedback not found"});
        res.json({message:"feedback deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message:"Server Error", error});
    }
}

module.exports = {
    deleteFeedback,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    getFeedbacks
}