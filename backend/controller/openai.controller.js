require("dotenv").config();
const axios = require("axios");
const { InterviewModel } = require("../models/interview.model");
const mongoose = require("mongoose");

// JS Controllers
const jsInterviewPost = async (req, res) => {
  const { userID } = req.body;
  const chatHistory = [];
  try {
    chatHistory.push({
      role: "system",
      content: `You are an artificial intelligence named "Amitabh Bachchan." You are conducting a JavaScript interview with a candidate. Here is a template for your interview behavior:

      1. **Introduction:**
         - Start the interview by introducing yourself. For example:
           "Hello, I'm Amitabh Bachchan, here to conduct your JavaScript interview. I'll be asking you a series of questions and providing feedback on your answers. Let's get started."
      
      2. **Questioning:**
         - Ask a total of five JavaScript-related questions, waiting for the candidate to respond before moving on to the next question. Provide brief explanations (one or two lines) for any improvements you think the candidate can make after each answer and then ask the next question.
      
      3. **Ending the Interview:**
         - If the candidate requests to end the interview, conclude the interview gracefully. Provide feedback along with the conclusion.
      
      4. **Evaluation:**
         - After the fifth question, provide a rating out of 10 for two aspects: communication skills, subject matter expertise and problem solving skills. For example:
           "Communication Skills: [Single Number Rating out of 10]"
           "Subject Matter Expertise: [Single Number Rating out of 10]"
           "Problem Solving Skills: [Single Number Rating out of 10]"
      
      5. **Hiring Status:**
         - Finally, give a hiring status verdict. This could be one of the following:
           - "No Hire"
           - "Hire"
           - "Strong Hire"
      
      Remember to simulate the interview process naturally, ask only one question at a time, and wait for the candidate to answer before moving to the next question.
      when I give you the phrase "end the interview" give the feedback as mentioned in instructions. If you can't evaluate the candidate skills please give 0 marks for all the criteria. 
      example:
      "Communication Skills: 0"
      "Subject Matter Expertise: 0"
      "Problem Solving Skills: 0"
      
      Let's start the interview!
      
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

      const hasFeedback = gptMessage.content.includes("Communication Skills");

      if (hasFeedback) {
        const communication = parseInt(
          gptMessage.content.match(/Communication Skills: (\d+)/)[1],
          10
        );
        const subjectExpertise = parseInt(
          gptMessage.content.match(/Subject Matter Expertise: (\d+)/)[1],
          10
        );
        const problemSolving = parseInt(
          gptMessage.content.match(/Problem Solving Skills: (\d+)/)[1],
          10
        );
        await InterviewModel.findOneAndUpdate(
          { _id: interviewId },
          { communication, subjectExpertise, problemSolving }
        );
      }

      // Send response to the client
      res.status(200).json({
        status: "success",
        message: "Chat message processed successfully",
        data: {
          chatHistory: interview.chatHistory,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// React Controllers
const reactInterviewPost = async (req, res) => {
  const { userID } = req.body;
  const chatHistory = [];
  try {
    chatHistory.push({
      role: "system",
      content: `You are an artificial intelligence named "Virat Kholi." You are conducting a React interview with a candidate. Here is a template for your interview behavior:

      1. **Introduction:**
         - Start the interview by introducing yourself. For example:
           "Hello, I'm Virat Kholi, here to conduct your React interview. I'll be asking you a series of questions and providing feedback on your answers. Let's get started."
      
      2. **Questioning:**
         - Ask a total of five React-related questions, waiting for the candidate to respond before moving on to the next question. Provide brief explanations (one or two lines) for any improvements you think the candidate can make after each answer and then ask the next question.
      
      3. **Ending the Interview:**
         - If the candidate requests to end the interview, conclude the interview gracefully. Provide feedback along with the conclusion.
      
      4. **Evaluation:**
         - After the fifth question, provide a rating out of 10 for two aspects: communication skills, subject matter expertise and problem solving skills. For example:
         "Communication Skills: [Single Number Rating out of 10]"
         "Subject Matter Expertise: [Single Number Rating out of 10]"
         "Problem Solving Skills: [Single Number Rating out of 10]"
      
      5. **Hiring Status:**
         - Finally, give a hiring status verdict. This could be one of the following:
           - "No Hire"
           - "Hire"
           - "Strong Hire"
      
      Remember to simulate the interview process naturally, ask only one question at a time, and wait for the candidate to answer before moving to the next question.
      when I give you the phrase "end the interview" give the feedback as mentioned in instructions. If you can't evaluate the candidate skills please give 0 marks for all the criteria. 
      example:
      "Communication Skills: 0"
      "Subject Matter Expertise: 0"
      "Problem Solving Skills: 0"
      
      Let's start the interview!
      
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
      type: "react",
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

const reactInterviewPatch = async (req, res) => {
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

      const hasFeedback = gptMessage.content.includes("Communication Skills");

      if (hasFeedback) {
        const communication = parseInt(
          gptMessage.content.match(/Communication Skills: (\d+)/)[1],
          10
        );
        const subjectExpertise = parseInt(
          gptMessage.content.match(/Subject Matter Expertise: (\d+)/)[1],
          10
        );
        const problemSolving = parseInt(
          gptMessage.content.match(/Problem Solving Skills: (\d+)/)[1],
          10
        );
        await InterviewModel.findOneAndUpdate(
          { _id: interviewId },
          { communication, subjectExpertise, problemSolving }
        );
      }

      // Send response to the client
      res.status(200).json({
        status: "success",
        message: "Chat message processed successfully",
        data: {
          chatHistory: interview.chatHistory,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Node Controllers
const nodeInterviewPost = async (req, res) => {
  const { userID } = req.body;
  const chatHistory = [];
  try {
    chatHistory.push({
      role: "system",
      content: `You are an artificial intelligence named "Christiano Ronaldo." You are conducting a Nodejs, express, mongo interview with a candidate. Here is a template for your interview behavior:

      1. **Introduction:**
         - Start the interview by introducing yourself. For example:
           "Hello, I'm Christiano Ronaldo, here to conduct your Nodejs, express, mongo interview. I'll be asking you a series of questions and providing feedback on your answers. Let's get started."
      
      2. **Questioning:**
         - Ask a total of five Nodejs, express, mongo-related questions, waiting for the candidate to respond before moving on to the next question. Provide brief explanations (one or two lines) for any improvements you think the candidate can make after each answer and then ask the next question.
      
      3. **Ending the Interview:**
         - If the candidate requests to end the interview, conclude the interview gracefully. Provide feedback along with the conclusion.
      
      4. **Evaluation:**
         - After the fifth question, provide a rating out of 10 for two aspects: communication skills, subject matter expertise and problem solving skills. For example:
         "Communication Skills: [Single Number Rating out of 10]"
         "Subject Matter Expertise: [Single Number Rating out of 10]"
         "Problem Solving Skills: [Single Number Rating out of 10]"
      
      5. **Hiring Status:**
         - Finally, give a hiring status verdict. This could be one of the following:
           - "No Hire"
           - "Hire"
           - "Strong Hire"
      
      Remember to simulate the interview process naturally, ask only one question at a time, and wait for the candidate to answer before moving to the next question.
      when I give you the phrase "end the interview" give the feedback as mentioned in instructions. If you can't evaluate the candidate skills please give 0 marks for all the criteria. 
      example:
      "Communication Skills: 0"
      "Subject Matter Expertise: 0"
      "Problem Solving Skills: 0"
      
      Let's start the interview!
      
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
      type: "node",
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

const nodeInterviewPatch = async (req, res) => {
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

      const hasFeedback = gptMessage.content.includes("Communication Skills");

      if (hasFeedback) {
        const communication = parseInt(
          gptMessage.content.match(/Communication Skills: (\d+)/)[1],
          10
        );
        const subjectExpertise = parseInt(
          gptMessage.content.match(/Subject Matter Expertise: (\d+)/)[1],
          10
        );
        const problemSolving = parseInt(
          gptMessage.content.match(/Problem Solving Skills: (\d+)/)[1],
          10
        );
        await InterviewModel.findOneAndUpdate(
          { _id: interviewId },
          { communication, subjectExpertise, problemSolving }
        );
      }

      // Send response to the client
      res.status(200).json({
        status: "success",
        message: "Chat message processed successfully",
        data: {
          chatHistory: interview.chatHistory,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Fullstack Controllers
const fullstackInterviewPost = async (req, res) => {
  const { userID } = req.body;
  const chatHistory = [];
  try {
    chatHistory.push({
      role: "system",
      content: `You are an artificial intelligence named "Rahul Gandhi." You are conducting a Full Stack MERN interview with a candidate. Here is a template for your interview behavior:

      1. **Introduction:**
         - Start the interview by introducing yourself. For example:
           "Hello, I'm Rahul Gandhi, here to conduct your Full Stack MERN interview. I'll be asking you a series of questions and providing feedback on your answers. Let's get started."
      
      2. **Questioning:**
         - Ask a total of five Full Stack MERN-related questions, waiting for the candidate to respond before moving on to the next question. Provide brief explanations (one or two lines) for any improvements you think the candidate can make after each answer and then ask the next question.
      
      3. **Ending the Interview:**
         - If the candidate requests to end the interview, conclude the interview gracefully. Provide feedback along with the conclusion.
      
      4. **Evaluation:**
         - After the fifth question, provide a rating out of 10 for two aspects: communication skills, subject matter expertise and problem solving skills. For example:
         "Communication Skills: [Single Number Rating out of 10]"
         "Subject Matter Expertise: [Single Number Rating out of 10]"
         "Problem Solving Skills: [Single Number Rating out of 10]"
      
      5. **Hiring Status:**
         - Finally, give a hiring status verdict. This could be one of the following:
           - "No Hire"
           - "Hire"
           - "Strong Hire"
      
      Remember to simulate the interview process naturally, ask only one question at a time, and wait for the candidate to answer before moving to the next question.
      when I give you the phrase "end the interview" give the feedback as mentioned in instructions. If you can't evaluate the candidate skills please give 0 marks for all the criteria. 
      example:
      "Communication Skills: 0"
      "Subject Matter Expertise: 0"
      "Problem Solving Skills: 0"
      
      Let's start the interview!
      
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
      type: "fullstack",
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

const fullstackInterviewPatch = async (req, res) => {
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

      const hasFeedback = gptMessage.content.includes("Communication Skills");

      if (hasFeedback) {
        const communication = parseInt(
          gptMessage.content.match(/Communication Skills: (\d+)/)[1],
          10
        );
        const subjectExpertise = parseInt(
          gptMessage.content.match(/Subject Matter Expertise: (\d+)/)[1],
          10
        );
        const problemSolving = parseInt(
          gptMessage.content.match(/Problem Solving Skills: (\d+)/)[1],
          10
        );
        await InterviewModel.findOneAndUpdate(
          { _id: interviewId },
          { communication, subjectExpertise, problemSolving }
        );
      }

      // Send response to the client
      res.status(200).json({
        status: "success",
        message: "Chat message processed successfully",
        data: {
          chatHistory: interview.chatHistory,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};

const getUserInterviewData = async (req, res) => {
  const { userID } = req.body;
  try {
    const userInterviews = await InterviewModel.find({userId: userID});

    const userTotalInterviews = userInterviews.length;

    // Function to calculate average marks for communication and subject expertise
    const calculateAverages = (interviews) => {
      const totalCount = interviews.length;
      const totalCommunicationMarks = interviews.reduce(
        (acc, interview) => acc + interview.communication,
        0
      );
      const totalSubjectExpertiseMarks = interviews.reduce(
        (acc, interview) => acc + interview.subjectExpertise,
        0
      );
      const totalProblemSolvingMarks = interviews.reduce(
        (acc, interview) => acc + interview.problemSolving,
        0
      );

      const avgCommunication =
        totalCount > 0 ? totalCommunicationMarks / totalCount : 0;
      const avgSubjectExpertise =
        totalCount > 0 ? totalSubjectExpertiseMarks / totalCount : 0;
      const avgProblemSolving =
        totalCount > 0 ? totalProblemSolvingMarks / totalCount : 0;

      return {
        count: totalCount,
        userTotalInterviews,
        avgCommunication,
        avgSubjectExpertise,
        avgProblemSolving,
        communicationScores: interviews.map(
          (interview) => interview.communication
        ),
        subjectExpertiseScores: interviews.map(
          (interview) => interview.subjectExpertise
        ),
        problemSolvingScores: interviews.map(
          (interview) => interview.problemSolving
        ),
      };
    };

    // Function to collect interview conversations
    const collectInterviewConversations = (interviews) => {
      return {
        conversations: interviews.map((interview) => interview.chatHistory),
      };
    };

    // Count and collect data for JavaScript interviews
    const javascriptInterviews = await InterviewModel.find({
      type: "javascript",
      userId: userID,
    });
    const javascriptData = {
      ...calculateAverages(javascriptInterviews),
      // ...collectInterviewConversations(javascriptInterviews),
    };

    // Count and collect data for React interviews
    const reactInterviews = await InterviewModel.find({
      type: "react",
      userId: userID,
    });
    const reactData = {
      ...calculateAverages(reactInterviews),
      // ...collectInterviewConversations(reactInterviews),
    };

    // Count and collect data for Node interviews
    const nodeInterviews = await InterviewModel.find({
      type: "node",
      userId: userID,
    });
    const nodeData = {
      ...calculateAverages(nodeInterviews),
      // ...collectInterviewConversations(nodeInterviews),
    };

    // Count and collect data for Full Stack interviews
    const fullStackInterviews = await InterviewModel.find({
      type: "fullstack",
      userId: userID,
    });
    const fullStackData = {
      ...calculateAverages(fullStackInterviews),
      // ...collectInterviewConversations(fullStackInterviews),
    };

    // Collect all interviews data
    const allInterviews = {
      javascriptData,
      reactData,
      nodeData,
      fullStackData,
    };

    res.status(200).json({
      allInterviews,
    });
  } catch (error) {
    console.error("Error fetching interviews data:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  jsInterviewPost,
  jsInterviewPatch,
  reactInterviewPost,
  reactInterviewPatch,
  nodeInterviewPost,
  nodeInterviewPatch,
  fullstackInterviewPost,
  fullstackInterviewPatch,
  getUserInterviewData,
};
