const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrptjs");
require("dotenv").config();
const { SECRET } = process.env;

// @route      GET api/auth/login
// @desc       auth user(student,tutor,admin) and get token
// @access     Public
exports.getLoggedInUer = async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.user.id).select("-password");
    //   return user
    res.json({
      statusCode: 200,
      message: "User gotten successfully",
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

// @route      POST api/auth/login
// @desc       auth user(student,tutor,admin) and get token
// @access     Public
exports.loginUser = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // else
  // destructure request body
  const { email, password } = req.body;

  try {
    // initialize user
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid Credentials",
      });

    //   else..
    //   check password
    const isMatch = await bcrypt.comapre(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid Credentials",
      });

    //   else
    //   theres a match, send token
    //   send payload, and signed token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          statusCode: 200,
          message: "Logged In Successfully",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRole: user.userRole,
            isTutor: user.isTutor,
            isAdmin: user.isAdmin,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
};
