require("dotenv").config();
const axios = require("axios");
const { InterviewModel } = require("../models/interview.model");

const jsInterviewPost = async (req, res) => {
  const { userID } = req.body;
  const chatHistory = [];
  try {
    chatHistory.push({
      role: "system",
      // content: `You are an artificial intelligence named ChatGPT. You are conducting a JavaScript interview with a candidate. Here is a template for your interview behavior:

      // 1. Introduction:
      //    - Start the interview by introducing yourself. For example:
      //      "Hello, I'm ChatGPT, an artificial intelligence designed to conduct JavaScript interviews. I'll be asking you a series of questions and providing feedback on your answers. Let's get started."

      // 2. Questioning:
      //    - Ask a total of five JavaScript-related questions, waiting for the candidate to respond before moving on to the next question. Provide brief explanations (one or two lines) for any improvements you think the candidate can make after each answer.

      // 3. Evaluation:
      //    - After the fifth question, provide a rating out of 10 for two aspects: communication skills and subject matter expertise. For example:
      //      "Communication Skills: [Rating out of 10]"
      //      "Subject Matter Expertise: [Rating out of 10]"

      // 4. Hiring Status:
      //    - Finally, give a hiring status verdict. This could be one of the following:
      //      - "No Hire"
      //      - "Hire"
      //      - "Strong Hire"

      // Remember to simulate the interview process naturally and provide constructive feedback where necessary.
      // Remember this, ask only one question at a time and wait for the candidate to answer that question and
      // only then move to the next question. Let's start the interview!"
      // `,
      content: `You are an artificial intelligence named "Amitabh Bachchan." You are conducting a JavaScript interview with a candidate. Here is a template for your interview behavior:

      1. *Introduction:*
         - Start the interview by introducing yourself. For example:
           "Hello, I'm Amitabh Bachchan, here to conduct your JavaScript interview. I'll be asking you a series of questions and providing feedback on your answers. Let's get started."
      
      2. *Questioning:*
         - Ask a total of five JavaScript-related questions, waiting for the candidate to respond before moving on to the next question. Provide brief explanations (two or three lines) for any improvements you think the candidate can make after each answer and then ask the next question.
      
      3. *Ending the Interview:*
         - If the candidate requests to end the interview, conclude the interview gracefully. Provide feedback along with the conclusion.
      
      4. *Evaluation:*
         - After the fifth question, provide a rating out of 10 for two aspects: communication skills and subject matter expertise. For example:
           "Communication Skills: [Rating out of 10]"
           "Subject Matter Expertise: [Rating out of 10]"
      
      5. *Hiring Status:*
         - Finally, give a hiring status verdict. This could be one of the following:
           - "No Hire"
           - "Hire"
           - "Strong Hire"
      
      Remember to simulate the interview process naturally, ask only one question at a time, and wait for the candidate to answer before moving to the next question. Let's start the interview!
      
      `,
    });

    const response = await axios.post(
      process.env.OPENAI_CHAT_ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: chatHistory,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data.choices[0].message) {
      chatHistory.push(response.data.choices[0].message);
    }

    let Interview = new InterviewModel({
      userId: userID,
      type: "javascript",
      chatHistory: chatHistory,
    });
    let newInterview = await Interview.save();

    // Send response to the client
    res.status(200).json({
      status: "success",
      message: "Chat message processed successfully",
      data: {
        interviewDetails: newInterview,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: err.message,
    });
  }
};

const jsInterviewPatch = async (req, res) => {
  const { interviewId, userReply } = req.body;

  try {
    // Update chat history with the latest user reply
    const interview = await InterviewModel.findOneAndUpdate(
      { _id: interviewId },
      {
        $push: {
          chatHistory: {
            role: "user",
            content: userReply,
          },
        },
      },
      { new: true }
    );

    // Get response from chatGPT
    const response = await axios.post(
      process.env.OPENAI_CHAT_ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: interview.chatHistory,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const gptMessage = response.data.choices[0].message;

    // Update chat history with GPT response
    // if (gptMessage) {
    //   interview.chatHistory.push({
    //     role: "gpt",
    //     content: gptMessage,
    //   });

    //   await interview.save();
    // }
    if (gptMessage) {
      const interview = await InterviewModel.findOneAndUpdate(
        { _id: interviewId },
        {
          $push: {
            chatHistory: gptMessage,
          },
        },
        { new: true }
      );

      // Send response to the client
      res.status(200).json({
        status: "success",
        message: "Chat message processed successfully",
        data: {
          chatMessages: interview.chatHistory,
        },
      });
    }

    // // Send response to the client
    // res.status(200).json({
    //   status: "success",
    //   message: "Chat message processed successfully",
    //   data: {
    //     chatMessages: interview.chatHistory,
    //   },
    // });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { jsInterviewPost, jsInterviewPatch };
