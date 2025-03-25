const {deleteFeedback,
    createFeedback,
    getFeedbackById,
    updateFeedback,
    getFeedbacks } = require('../controllers/feedbackController');

    const router = require('express').Router();

    router.get('/', getFeedbacks);
    router.post('/', createFeedback);
    router.get('/:id', getFeedbackById);
    router.put('/:id', updateFeedback);
    router.delete('/:id', deleteFeedback);


module.exports = router;