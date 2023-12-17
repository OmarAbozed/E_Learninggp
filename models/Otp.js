const mongoose=require("mongoose");
const OTPschema=new mongoose.Schema({
    code:{type:String,},
    email:{type:String},
    createdat:{type:Number},
    expirat:{type:Number}
})
const OTP=mongoose.model("OTP",OTPschema);
exports.OTP=OTP;