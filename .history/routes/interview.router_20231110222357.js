const express = require("express");
const { openaiFunction } = require();

const userRouter = express.Router();

userRouter.post("/register", userRegister);

module.exports = { userRouter };