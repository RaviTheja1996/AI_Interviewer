const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../models/user.model");
const {BlackListModel} = require("../models/blacklist.model");

const userRegister = async (req, res) => {
    const {username, email, password, avatar} = req.body;
    const userVerify = await UserModel.findOne({email});
    if(userVerify)
    {
        res.status(200).send({ "msg": "User already exist, please login" });
        return;
    }
    try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ "error": err.message });
      }
      else {
        const user = new UserModel({username, email, password, avatar, interviews: []});
        const new_user = await user.save();
        res.status(200).send({ "msg": "A new user has been registered", "newUser": new_user });
      }
    });
  }
 }

 cosnt userLogin = async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await UserModel.findOne({email}); 
        if(user)
        {
            bcrypt.compare(password, user.password, (err,result) => {
                if(result)
                {
                    const token = jwt.sign({ username: user.name, userID: user._id }, "hackforce", { expiresIn: "7d" });
                    res.status(200).send({ "msg": "logged in successfully", "token": token });
                    return;
                }
                if (err) 
                {
                    res.status(200).send({ "err": err.message });
                }
            })
        }
        else 
        {
            res.status(200).send({ "msg": "The user doesn't exist please register first" });
        }
    }
    catch (err) 
    {
        res.status(400).send({ "error": err.message });
    }
 }

 const userLogout = async (req,res) => {
    const tokenValue = req.headers.token?.split(" ")[1];
    try 
    {
        const doc = new BlackListModel({ token: tokenValue });
        await doc.save();
        res.status(200).send({ "msg": "You have been logged out" });
    }
    catch (err) 
    {
        res.status(400).send({ "Error": err.message });
    }
 }

module.exports = { userRegister,userLogin,userLogout };