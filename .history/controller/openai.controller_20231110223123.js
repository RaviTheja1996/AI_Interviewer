const openaiFunction = async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
      }),
    });

    const data = await response.json();
  }
  catch (err) {
    res.status(500).send({ "Error": err.message, "msg": "Error ocurred while generating response" });
  }
}

module.exports = { openaiFunction };