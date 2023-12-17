const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
const {Student}=require("../models/Student");
const { OTP } = require("../models/Otp");
const bcrypt =require("bcrypt");


router.get("/",asyncHandler(async(req,res)=>{
    let flag=0;
    if(!req.query.token){
        return res.status(400).json({message:"bad req"})
    }
    const decoded=jwt.verify(req.query.token,process.env.VERIFY_SECRIT_KEY)
    if(!decoded){
        return res.status(401).json({message:"not athuraized"})
    }
    let student=await Student.findOne({email:decoded.email})
    if(!student){
        return res.status(404).json({message:"not found"})
    }
    if(student.verified){
        return res.status(401).json({message:"already verified"})
    }
    student.verified=true;
    await student.save()

    return res.sendStatus(200)//front end
}))

router.post("/byotp",asyncHandler(async(req,res)=>{
    if(!req.body.email){
        return res.status(400).json({msg:"No Email"})
    }
    let student =await Student.findOne({email:req.body.email})
    if(!student){
        return res.status(400).json({msg:"Not Found"})
    }
    if(!req.body.otp){
        return res.status(400).json({msg:"No OTP"})
    }
    let otp=await OTP.findOne({email:req.body.email})
    if(!otp){
        return res.status(400).json({msg:"No OTP Send"})
    }
    let now=new Date()
    if(Number(now)>Number(otp.expirat)){
        return res.status(400).json({msg:"OTP is expired"})
    }
    if(!(await bcrypt.compare(req.body.otp,otp.code))){
        return res.status(401).json({msg:"OTP dose not Match"})
    }
    student.verified=true;
    await student.save();
    await OTP.deleteMany({email:student.email})
    
    return res.status(200).json({msg:"Verified"});
}))

module.exports=router;
