const SystemFeedback = require('../models/systemFeedbackModel');

// Get all system feedbacks
const getSystemFeedback = async (req, res) => {
  try {
    const feedbacks = await SystemFeedback.find({});
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get feedback by ID
const getSystemFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await SystemFeedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "SystemFeedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Create new system feedback
const createSystemFeedback = async (req, res) => {
  try {
    const feedback = new SystemFeedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data", error });
  }
};

// Update system feedback
const updateSystemFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await SystemFeedback.findByIdAndUpdate(id, req.body, { new: true });
    if (!feedback) {
      return res.status(404).json({ message: "SystemFeedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data", error });
  }
};

// Delete system feedback
const deleteSystemFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await SystemFeedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: "SystemFeedback not found" });
    }
    res.json({ message: "SystemFeedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getSystemFeedback,
  getSystemFeedbackById,
  createSystemFeedback,
  updateSystemFeedback,
  deleteSystemFeedback,
};
