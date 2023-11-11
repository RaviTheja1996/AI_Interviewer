require("dotenv").config();

const openaiFunction = async (req, res) => {
  try {
    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.content }],
      }),
    });

    const data = await response.json();
    res.status(200).send({ "response": data });
  }
  catch (err) {
    res.status(500).send({ "Error": err.message, "msg": "Error ocurred while generating response" });
  }
}

module.exports = { openaiFunction };