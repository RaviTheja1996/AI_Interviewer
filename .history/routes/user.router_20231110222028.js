const express = require("express");
const { userRegister } = require();

const userRouter = express.Router();

userRouter.post("/register", userRegister);

module.exports = { userRouter };