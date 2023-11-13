const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "hackforce", (err, decoded) => {
      if (decoded) {
        req.body.username = decoded.username;
        req.body.userID = decoded.userID;
        next();
      } else {
        res.status(400).send({
          status: "fail",
          message: "You are not authorized, check your token",
        });
      }
    });
  } else {
    res.status(400).send({ status: "fail", message: "Please login first" });
  }
};

module.exports = { authMiddleware };
