const express=require('express');
const router=express.Router();
const User = require("../../models/User");
const verifyToken = require('../../middlewar/authmiddlewar');

router.get("/getprofile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
});

module.exports=router;