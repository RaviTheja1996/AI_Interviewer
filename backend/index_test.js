// -------------------------------
// V1

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.API_KEY;
const OPENAI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

// Store chat messages in memory (you may want to use a database in a real-world scenario)
let chatMessages = [];

// Route to handle incoming chat messages
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Add user message to chatMessages
    chatMessages.push({
      role: "user",
      content: messages[messages.length - 1].content,
    });

    // Request to OpenAI API
    const response = await axios.post(
      OPENAI_CHAT_ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: chatMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Process OpenAI response
    // console.log(`response.data =>`, response.data.choices[0].message);

    if (response.data.choices[0].message) {
      chatMessages.push(response.data.choices[0].message);
    }
    // console.log(`// --------------------------- `);
    // console.log(`chatMessages =>`, chatMessages);

    // Send response to the client
    res.status(200).json({
      message: "Chat message processed successfully",
      chatMessages: chatMessages,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// -------------------------------
// V2 - TTS implemented in backend and
// sending audio file from backend

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const { TextToSpeechClient } = require("@google-cloud/text-to-speech");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// const OPENAI_API_KEY = process.env.API_KEY;
// const OPENAI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// // const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_APPICATION_CREDENTIALS;
// const GOOGLE_CLOUD_PROJECT_ID = process.env.project_id;

// // Store chat messages in memory (you may want to use a database in a real-world scenario)
// let chatMessages = [];

// // Google Cloud Text-to-Speech client
// const textToSpeechClient = new TextToSpeechClient();

// // Function to generate audio from text using Google Cloud Text-to-Speech
// async function generateAudio(text) {
//   const request = {
//     input: { text },
//     voice: { languageCode: "en-GB", name: "en-GB-Neural2-B" },
//     audioConfig: { audioEncoding: "LINEAR16" },
//   };

//   const [response] = await textToSpeechClient.synthesizeSpeech(request);
//   return response.audioContent;
// }

// // Route to handle incoming chat messages
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { messages } = req.body;

//     // Add user message to chatMessages
//     chatMessages.push({
//       role: "user",
//       content: messages[messages.length - 1].content,
//     });

//     // Request to OpenAI API
//     const response = await axios.post(
//       OPENAI_CHAT_ENDPOINT,
//       {
//         model: "gpt-3.5-turbo",
//         messages: chatMessages,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//       }
//     );

//     // Process OpenAI response
//     const aiMessage = response.data.choices[0].message;
//     chatMessages.push(aiMessage);

//     // Generate audio from the AI message
//     const audioBuffer = await generateAudio(aiMessage);

//     // Send response to the client with both text and audio
//     res.status(200).json({
//       message: "Chat message processed successfully",
//       chatMessages: chatMessages,
//       audio: audioBuffer.toString("base64"), // Sending audio as base64 string
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
