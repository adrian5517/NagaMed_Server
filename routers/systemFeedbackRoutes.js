const {getSystemFeedback,
    getSystemFeedbackById,
    createSystemFeedback,
    updateSystemFeedback,
    deleteSystemFeedback} = require('../controllers/systemFeedbackController');

    const router = require('express').Router();

    router.get('/', getSystemFeedback);
    router.post('/', createSystemFeedback);
    router.get('/:id', getSystemFeedbackById);
    router.put('/:id', updateSystemFeedback);
    router.delete('/:id', deleteSystemFeedback);

module.exports = router;