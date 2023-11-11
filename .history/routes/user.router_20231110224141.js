const express = require("express");
const { userRegister } = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/register", userRegister);

module.exports = { userRouter };