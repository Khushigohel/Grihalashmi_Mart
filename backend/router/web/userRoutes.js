const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

router.post("/signUp", async (req, res) => {
  const { fname, email, phoneNumber, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res
        .status(409)
        .json({ success: false, message: "User Already Existing" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fname,
      email,
      phoneNumber,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Registration succeesfully..." });
  } catch (error) {
    console.log("Sign Up error", error);
    res.status(500).json({ message: "Server error during Signup" });
  }
});
router.get("/signIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      console.log("User is not found", email);
      return res.status(404).json({
        success: false,
        message: "User is not Avaiable",
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordEqual) {
      console.log("Pssword is Not Match");
      return res.status(401).json({
        success: false,
        message: "Invalid is Password ",
      });
    }
    console.log("Password is Match");
    res.status(200).json({
      success: true,
      message: "Login Successfully..",
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

module.exports = router;
