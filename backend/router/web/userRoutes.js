const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

router.get("/countUser", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to count users" });
  }
});
// router.post("/checkEmail", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     return res.json({ exists: !!user });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });


router.post("/signUp", async (req, res) => {
  try {
    const { fname, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fname,
      email,
      phoneNumber,
      password: hashPassword,
    });

    res.status(201).json({ success: true, message: "Registration successful" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});


router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      return res.status(404).json({
        success: false,
        message: "User not found, please register.",
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordEqual) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: userLogin._id },
      process.env.Jwt_Token || "default_secret_key",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      fname: userLogin.fname,
      userId: userLogin._id,
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    console.error("Sign In error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});


module.exports = router;
