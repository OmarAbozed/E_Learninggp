const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
const {Student}=require("../models/Student");

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

module.exports=router;
