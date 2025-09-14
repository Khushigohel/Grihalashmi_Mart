const mongoose=require("mongoose");
const AddressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type: String,
        required: true,
        match: /^[0-9]{10,15}$/
    },
    address:{
        type:String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("Address",AddressSchema)