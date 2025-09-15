const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const OtpStore = require("../../models/OtpStore");
const User = require("../../models/User");

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const otp = crypto.randomInt(100000, 999999).toString();

    await OtpStore.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 20 * 60 * 1000),
    });

    return res.status(200).json({ message: "OTP generated", otp });

  } catch (err) {
    console.error("Error in /send-otp:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpEntry = await OtpStore.findOne({ email, otp });

    if (!otpEntry) return res.status(400).json({ message: "Invalid OTP" });
    if (otpEntry.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    await OtpStore.deleteOne({ _id: otpEntry._id });
    return res.status(200).json({ message: "Password reset successful" });

  } catch (err) {
    console.error("Error in /reset-password:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
