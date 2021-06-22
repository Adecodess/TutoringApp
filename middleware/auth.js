//  check to see if theres a token and a header
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");

  // check if doesnt exist
  if (!token)
    return res
      .status(401)
      .json({ statusCode: 401, message: "No Token, authorization denied " });

  // else.. token exits
  try {
    const decoded = jwt.verify(token, SECRET);

    //   assign user to request object
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: "Token is not Valid",
    });
  }
};
