const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['react', 'mern', 'nem'], required: true },
  conversations: [
    {
      question: { type: String, required: true },
      userResponse: { type: String },
      feedback: {
        strengths: [{ type: String }], improvements: [{ type: String }]
      }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
