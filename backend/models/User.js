const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports=mongoose.model("User",userSchema)



