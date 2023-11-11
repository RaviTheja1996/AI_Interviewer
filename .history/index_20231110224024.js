const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { AI_Interviewer_Router } = require("./routes/interview.router");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/interview", AI_Interviewer_Router);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connect to DB");
    console.log(`server is running at port ${process.env.PORT}`);
  }
  catch (err) {
    console.log({ err: err.message });
  }
})