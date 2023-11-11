// import OpenAI from "openai";
require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.apiKey });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

module.exports = { main };