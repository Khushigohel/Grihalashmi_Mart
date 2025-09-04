const express=require("express");
const router=express.Router();

router.post("/",async(req,res)=>{
    try {
        const {userId,FullName,PhoneNumber,Address,Pincode,City,State}=req.body;
        const newAddress = new Address({ userId,FullName , PhoneNumber, Address, Pincode, City,State });
        await newAddress.save();

        res.status(201).json({message:"Address Saved Sucessfully" ,address:newAddress})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
});
module.exports=router;