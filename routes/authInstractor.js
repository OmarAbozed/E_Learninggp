const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const{Instractor,ValidationRegisterInstructor,ValidationLoginInstractor}=require("../models/Instructor");


/**
 *  @desc    register new student
 *  @route   /api/register
 *  @method  POST
 *  @access  public
 */

router.post("/register",asyncHandler(async(req,res)=>{
    const{ error }=ValidationRegisterInstructor(req.body);
    if(error){
        return res.status(400).json(error.details[0].message)
    }
    
    let instractor=await Instractor.findOne({email:req.body.email})
    if(instractor){
        return res.status(400).json({ message: "The instractor is already registered" });
    }

    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt);

    instractor=new Instractor({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        image:req.body.image,
    });
    const result=await instractor.save();
    const token=await jwt.sign({id:instractor._id,IsAdmin:instractor.IsAdmin},process.env.JWT_SECRIT_KEY)
    const{password,...other}=result._doc;

    res.status(201).json({...other,token});


}));

/**
 *  @desc    login new student
 *  @route   /api/register
 *  @method  POST
 *  @access  public
 */

router.post("/login",asyncHandler(async(req,res)=>{
    const {error}=ValidationLoginInstractor(req.body);
    if(error)
    {
        return res.status(400).json(error.details[0].message)
    }
    
    let instractor=await Instractor.findOne({email:req.body.email})
    if(!instractor){
        return res.status(400).json({massage:"Email or Password Not Correct"})
    }

    const Passwordmatch= await bcrypt.compare(req.body.password,instractor.password)
    if(!Passwordmatch){
        return res.status(400).json({massage:"Email or Password Not Correct"})
    }

    const token =await jwt.sign({id:instractor._id,IsAdmin:instractor.IsAdmin},process.env.JWT_SECRIT_KEY);
    const {password,...other}=instractor._doc

    
    res.status(201).json({...other,token});

}))

module.exports=router;