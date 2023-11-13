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
      content: `I want you to act as an expert frontend software developer. You are asked to take my technical interview for the position of frontend software developer and share your feedback. 
      In my new job I will be building web apps which will require for me to have knowledge of the concepts provided below. When I ask you to start taking interview, then #### start asking questions without giving answer which shall compulsory be based on the knowledge required for this position. #### 
      
      
      #### Concepts: "- Virtual DOM
      - JSX, Rules of JSX
      - Babel
      - Javascript in JSX
      - Components
      - Props
      - Events
      - Conditional rendering
      - useState Hook
      - List and Keys
      - useRef Introduction, applications
      - Difference between useRef and useState
      - Form Management
      - State updation and State upliftment revision
      - Props drilling
      - Content API - Intro and Usage
      - Building some applications using context API
      - useReducer hook
      "#### 
      
      #### Some example of the questions that can be asked are:
      {
      - What is an  vDOM?
      - What is JSX? Can browser understand JSX?
      } ####
      
      These questions are for understanding question type but actual question can be different.
      I will say the phrase “start the interview” for you to start. Ask one question at a time  if I am not able to answer satisfactorily, ####give me feedback in this framework in no more than 50 words####:
      DUBX: 
      D - Definition (it should include the key technical terms) 
      U - Use Cases 
      B - Benefits 
      X - Extra Information 
      #### An example to explain the concept "Objects" in javascript you would use it like this: 
      Definition: Object is a data type that stores data in the form of key-value pairs. It also allows actions to be performed on this data using methods. 
      Use Cases: It is used whenever you have unordered data which has to be fetched using a property name. 
      Example use cases:
       - Amazon_User: keys are name, age, gender, address, orders, payment_method 
       - Product: name, price, rating, reviews, inventory 
      Benefits: Unlike Arrays, with Objects you don't need to search information in the whole array. You can fetch the required value simply from its key. 
      Extra Information: Objects can also capture the entity's behavior using Object methods. Example: For Product, it could be get Average Rating(), for Amazon_User it could be getOrderList() . ####
      
      Then, ask another question after I provide the answer. Questions can include both new questions and follow up questions from the previous questions. An example of follow-up question would be:
      ####First question: What is the CSS box-sizing property and how does it work?
      Follow-up question: Can you explain a scenario where using the box-sizing property with the value border-box would be beneficial?
      ####
      
      Continue the process until I ask you to stop.  
      And, you will stop the interview when I tell you to stop using the phrase “stop the interview”. 
      After that, you would provide me feedback when I ask you using the phrase, “share your feedback”.
      
      The feedback should be evaluated using the following rubrics
      1.Subject Matter Expertise
      2.Communication skills
      3.Hiring criteria : Options are Reject, Waitlist, Hire and Strong Hire
      Feedback for Subject Matter Expertise and Communication skills should contain ratings on my interview responses from 0 - 10
      
      Please dont provide answers for the questions you are asking, let the candidate answer them.
      Please say “Yes” if you understood my instructions.`,
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
