const Feedback = require('../models/Feedback');
const { syncFeedbackLog } = require('../utils/excelSync');

const submitFeedback = async (req, res) => {
    const { name, email, improvements, doubts, suggestions } = req.body;

    try {
        const feedback = await Feedback.create({
            name,
            email,
            improvements,
            doubts,
            suggestions
        });

        if (feedback) {
            await syncFeedbackLog(name, email, improvements, doubts, suggestions);
            res.status(201).json({ message: 'Feedback submitted successfully' });
        } else {
            res.status(400).json({ message: 'Invalid feedback data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { submitFeedback };
