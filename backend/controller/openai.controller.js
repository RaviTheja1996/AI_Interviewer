require("dotenv").config();
const axios = require("axios");
let chatHistory = [];

const openaiFunction = async (req, res) => {
  try {
    const { messages } = req.body;
    chatHistory.push({
      role: "user",
      content: messages[messages.length - 1].content,
    });

    // const response = await fetch(process.env.API_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: chatHistory }],
    //   }),
    // });

    const response = axios.post(process.env.API_URL, {
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.apiKey}`,
        },
      }
    ).then((res) => {
      console.log(res.data);
    }).catch((err) => console.log(`axios request failed :`, err.message));

    // const data = await response.json();
    // res.status(200).send({ "response": data });
    if (response.data.choices[0].message) {
      chatHistory.push(response.data.choices[0].message);
    }
    // chatHistory.push(response.data);
    console.log(`chatHistory =>`, chatHistory);

    // Send response to the client
    res.status(200).json({
      message: "Chat message processed successfully",
      chatMessages: chatHistory,
    });
  }
  catch (err) {
    res.status(500).send({ "catch block Error": err.message, "msg": "Error ocurred while generating response" });
  }
}

module.exports = { openaiFunction };