const express = require("express");
const { openaiFunction } = require("../controller/openai.controller");

const userRouter = express.Router();

userRouter.post("/register", userRegister);

module.exports = { userRouter };