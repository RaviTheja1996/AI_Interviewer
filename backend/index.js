const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { AI_Interviewer_Router } = require("./routes/interview.router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/interview", AI_Interviewer_Router);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to homepage");
})

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log(`server is running at port ${process.env.PORT}`);
  } catch (err) {
    console.log({ connection_err: err.message });
  }
});
