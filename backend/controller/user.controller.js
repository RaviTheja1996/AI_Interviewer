const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const { BlackListModel } = require("../models/blacklist.model");

// const userRegister = async (req, res) => {
//   const { username, email, password } = req.body;
//   const userVerify = await UserModel.findOne({ email });
//   if (userVerify) {
//     res.status(200).send({
//       status: "success",
//       message: "User already exists, please login",
//     });
//     return;
//   }
//   try {
//     bcrypt.hash(password, 5, async (err, hash) => {
//       if (err) {
//         res.status(200).send({ error: err.message });
//       } else {
//         const user = new UserModel({
//           username,
//           email,
//           password,
//         });
//         const new_user = await user.save();
//         res.status(200).send({
//           status: "success",
//           message: "A new user has been registered",
//           data: {
//             newUser: new_user,
//           },
//         });
//       }
//     });
//   } catch (err) {
//     res.status(400).send({ status: "fail", message: err.message });
//   }
// };

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userVerify = await UserModel.findOne({ email });
    if (userVerify) {
      return res.status(200).send({
        status: "success",
        message: "User already exists, please login",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user with the hashed password
    const user = new UserModel({
      username,
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the new user to the database
    const new_user = await user.save();

    return res.status(200).send({
      status: "success",
      message: "A new user has been registered",
      data: {
        newUser: new_user,
      },
    });
  } catch (err) {
    return res.status(400).send({ status: "fail", message: err.message });
  }
};

// const userLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result) {
//           const token = jwt.sign(
//             { username: user.username, userID: user._id },
//             "hackforce",
//             { expiresIn: "7d" }
//           );
//           console.log("1");
//           res.status(200).send({
//             status: "success",
//             message: "logged in successfully",
//             data: {
//               token,
//             },
//           });
//           return;
//         }
//         if (err) {
//           res.status(200).send({ status: "fail", message: err.message });
//         }
//       });
//     } else {
//       res
//         .status(200)
//         .send({ message: "The user doesn't exist please register first" });
//     }
//   } catch (err) {
//     res.status(400).send({ status: "fail", message: err.message });
//   }
// };

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        message: "The user doesn't exist, please register first",
      });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { username: user.username, userID: user._id },
          "hackforce",
          { expiresIn: "7d" }
        );

        return res.status(200).send({
          status: "success",
          message: "Logged in successfully",
          data: {
            token,
          },
        });
      } else {
        return res.status(200).send({
          status: "fail",
          message: "Invalid password",
        });
      }
    } catch (bcryptError) {
      return res.status(500).send({
        status: "error",
        message: "Error comparing passwords",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
};

// const userLogout = async (req, res) => {
//   const tokenValue = req.headers.token?.split(" ")[1];
//   try {
//     const doc = new BlackListModel({ token: tokenValue });
//     await doc.save();
//     res
//       .status(200)
//       .send({ status: "success", message: "You have been logged out" });
//   } catch (err) {
//     res.status(400).send({ status: "fail", message: err.message });
//   }
// };

const userLogout = async (req, res) => {
  const tokenValue = req.headers.token?.split(" ")[1];
  try {
    if (!tokenValue) {
      throw new Error("Token not provided in the headers");
    }

    const doc = new BlackListModel({ token: tokenValue });
    await doc.save();

    res
      .status(200)
      .send({ status: "success", message: "You have been logged out" });
  } catch (err) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};

module.exports = { userRegister, userLogin, userLogout };
