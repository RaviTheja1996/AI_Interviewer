const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, "hackforce", (err, decoded) => {
      if (decoded) {
        req.body.username = decoded.username;
        req.body.userID = decoded.userID;
        next();
      }
      else {
        res.status(400).send({ "msg": "You are not authorized, check your token" });
      }
    });
  }
  else {
    res.status(400).send({ "msg": "Please login first" });
  }
 }

module.exports = { authMiddleware };