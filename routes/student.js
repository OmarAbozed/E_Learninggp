const express=require("express");
const router=express.Router();
const {verfytokenAndAuturiztion,verfytokenAndAdmin}=require("../middleware/verifytoken");
const{Student,ValidationUpdateStudent}=require("../models/Student");
const bcrypt=require("bcrypt");
const asyncHandler=require("express-async-handler");

/**
 *  @desc    Get all student
 *  @route   /api/student
 *  @method  GET
 *  @access  private
 */

router.get("/",verfytokenAndAdmin,asyncHandler(async(req,res)=>{
    const students=await Student.find().select("-password");
    res.status(200).json(students)
}))

/**
 *  @desc    Get student By ID
 *  @route   /api/student/"id"
 *  @method  GET
 *  @access  private
 */

router.get("/:id",verfytokenAndAuturiztion,asyncHandler(async(req,res)=>{
    const student=await Student.findById(req.params.id).select("-password")
    if(student){
        res.status(200).json(student)
    }else{
        res.status(404).json({massage:"the student Not Found"})
    }

}))

/**
 *  @desc    Update student
 *  @route   /api/student/"id"
 *  @method  put
 *  @access  private
 */

router.put("/:id",verfytokenAndAuturiztion,asyncHandler(async(req,res)=>{
    const{ error }=ValidationUpdateStudent(req.body)
    if(error){
        return res.status(400).json(error.details[0].message);
    }

    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt)
    }

    const updatestudent=await Student.findByIdAndUpdate(req.params.id,{
        $set:{
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
            phone:req.body.phone,
            image:req.body.image
        }
    },{new:true}).select("-password")
    
        res.status(200).json(updatestudent)

    }))

    /**
 *  @desc    delete student
 *  @route   /api/student/"id"
 *  @method  Deleted
 *  @access  private
 */

router.delete("/:id",verfytokenAndAuturiztion,asyncHandler(async(req,res)=>{
    const student =await Student.findById(req.params.id)
    if(student){
        await Student.findByIdAndDelete(req.params.id)
        res.status(200).json({massage:"The student Is Deleted"})
    }else{
        res.status(404).json({massage:"student Not Found"})
    }
}))

module.exports=router;
