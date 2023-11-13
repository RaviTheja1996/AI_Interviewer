const express = require("express");
const { userRegister } = require("../controller/user.controller");
const { userLogin } = require("../controller/user.controller");
const { userLogout } = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);

module.exports = { userRouter };
