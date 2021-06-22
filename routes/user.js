const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// import router controller
const usersController = require("../controllers/usersControllers");

// login user data
router.post(
  "/api/auth/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "A valid password is required").exists(),
  ],

  usersController.loginUser
);

// get logged in user
router.get("/api/auth", auth, usersController.getLoggedInUser);

module.exports = router;
