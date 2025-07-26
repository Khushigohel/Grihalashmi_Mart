const express=require('express');
const router=express.Router();
const User = require("../../models/User");
const verifyToken = require('../../middlewar/authmiddlewar');

router.get("/getProfile",verifyToken,async(req,res)=>{
    try {
       const user=await User.findById(req.user.id).select('-password');
       res.json({success : true , user});
    } catch (error) {
        res.status(500).json({message:"Error fetching profile"})
    }

});
module.exports=router;