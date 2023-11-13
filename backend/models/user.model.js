const mongoose = require("mongoose");

// const interviewSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   userResponse: { type: String },
//   feedback: {
//     strengths: [{ type: String }],
//     improvements: [{ type: String }],
//   },
// });

// const interviewFeedbackSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   interviewType: { type: String, required: true },
//   strengths: [{ type: String }],
//   improvements: [{ type: String }],
//   createdAt: { type: Date, default: Date.now },
// });

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   avatar: { type: String, required: true },
//   interviews: [
//     {
//       type: { type: String, enum: ["react", "mern", "nem"] },
//       feedback: {
//         type: interviewFeedbackSchema,
//       },
//       conversations: [interviewSchema],
//     },
//   ],
// });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
