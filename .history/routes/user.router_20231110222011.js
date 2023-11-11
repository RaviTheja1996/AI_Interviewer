const express = require("express");

const userRouter = express.Router();

userRouter.post("/register", userRegister);

module.exports = { userRouter };