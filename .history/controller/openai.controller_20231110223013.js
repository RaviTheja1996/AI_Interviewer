const openaiFunction = async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send({ "Error": err.message, "msg": "Error ocurred while generating response" });
  }
}