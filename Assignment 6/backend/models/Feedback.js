const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    improvements: { type: String },
    doubts: { type: String },
    suggestions: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
