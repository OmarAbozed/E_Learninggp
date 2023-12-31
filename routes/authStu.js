const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const {Student,ValidationLoginStudent,ValidationRegisterStudnet}=require("../models/Student");
const nodemailer =  require('nodemailer'); 
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const {OTP} = require('../models/Otp');

/**
 *  @desc    register new student
 *  @route   /api/register
 *  @method  POST
 *  @access  public
 */

router.post("/register",async(req,res)=>{
    console.log(req.body)
    try {
        const{ error }=ValidationRegisterStudnet(req.body);
    if(error){
        return res.status(400).json(error.details[0].message)
    }

    let student= await Student.findOne({email:req.body.email})
    if(student){
        return res.status(400).json({ message: "The Student is already registered" });
    }

    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt);
    
    student=new Student({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        image:req.body.image,
        verifyBy:req.body.verifyBy
    });
    if(req.body.verifyBy=='LINK'){
        const emailtemplate=fs.readFileSync(
            path.join(__dirname,"../public/mail-template/index.ejs",),
            "utf8"
        )
        const verifytoken=jwt.sign({email:student.email},process.env.VERIFY_SECRIT_KEY,{expiresIn:"5m"})
        const data={
            message:`${verifytoken}`
    
        }
        const modifiedEmailTemplate = ejs.render(emailtemplate, data);
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "Gmail",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        });
        let message = {
        from: "Online University",
        to: req.body.email,
        subject: "Welcome to The Online University - Confirm Your Account ",//project name
        html: modifiedEmailTemplate,
        };
        await transporter.sendMail(message);
    }else{
        await OTP.deleteMany({
            email:student.email
        })
        let Otp=Math.floor(1000+Math.random()*9000);
        let start=new Date();
        start.setMinutes(start.getMinutes());
        let end=new Date();
        end.setMinutes(end.getMinutes()+5);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
            });
            let message = {
            from: "Online University",
            to: req.body.email,
            subject: "Welcome to The Online University - Confirm Your Account ",//project name
            text: `Your Verification code is ${Otp}, Please don't share it with anyone, this code will expire in 5 minutes`,
            html: `<p>Your Verification code is<br><h1>${Otp}</h1><br>Please don't share it with anyone.<br>this code will expire in 5 minutes`,
            };
            await transporter.sendMail(message);


        let OtpObj=new OTP({
            code:await bcrypt.hash(String(Otp),10),
            email:student.email,
            createdat:Number(start),
            expirat:Number(end)
        })
        await OtpObj.save()
        
    }
    const result=await student.save();

    const {password,...other}=result._doc;
    res.status(200).json({...other});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error 500"})
    }
});

/**
 *  @desc    login student
 *  @route   /api/login
 *  @method  POST
 *  @access  public
 */

router.post("/login",asyncHandler(async(req,res)=>{
    const {error}=ValidationLoginStudent(req.body);
    if(error)
    {
        return res.status(400).json(error.details[0].message)
    }
    
    let student=await Student.findOne({email:req.body.email})
    if(!student){
        return res.status(400).json({massage:"Email or Password Not Correct"})
    }
    if(!student.verified){
        return res.status(401).json({msg:"your acount not verified"})
    }
    const Passwordmatch= await bcrypt.compare(req.body.password,student.password)
    if(!Passwordmatch){
        return res.status(400).json({massage:"Email or Password Not Correct"})
    }

    const token =await jwt.sign({id:student._id},process.env.JWT_SECRIT_KEY);
    const {password,...other}=student._doc

    
    res.status(201).json({...other,token});

}))



module.exports=router;