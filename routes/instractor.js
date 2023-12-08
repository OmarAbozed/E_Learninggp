const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt=require("bcrypt");
const{Instractor,ValidationUpdateInstractor }=require("../models/Instructor");
const {verifytoken,verfytokenAndAdmin,verfytokenAndAuturiztion}=require("../middleware/verifytoken");

/**
 *  @desc    Get all instractor
 *  @route   /api/instractor
 *  @method  GET
 *  @access  private
 */

router.get("/",verfytokenAndAdmin,asyncHandler(async(req,res)=>{
    const instractor=await Instractor.find().select("-password");
    res.status(200).json(instractor)
}))

/**
 *  @desc    Get instractor By ID
 *  @route   /api/instractor/"id"
 *  @method  GET
 *  @access  private
 */

router.get("/:id",verfytokenAndAuturiztion,asyncHandler(async(req,res)=>{
    const instractor=await Instractor.findById(req.params.id).select("-password")
    if(instractor){
        res.status(200).json(instractor)
    }else{
        res.status(404).json({massage:"the instractor Not Found"})
    }

}))

/**
 *  @desc    Update instractor
 *  @route   /api/instractor/"id"
 *  @method  put
 *  @access  private
 */

router.put("/:id",verfytokenAndAuturiztion,asyncHandler(async(req,res)=>{
    const{ error }=ValidationUpdateInstractor(req.body)
    if(error){
        return res.status(400).json(error.details[0].message);
    }

    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt)
    }

    const updateinstractor=await Instractor.findByIdAndUpdate(req.params.id,{
        $set:{
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
            phone:req.body.phone,
            image:req.body.image
        }
    },{new:true}).select("-password")
    
        res.status(200).json(updateinstractor)

    }))

/**
 *  @desc    delete instractor
 *  @route   /api/instractor/"id"
 *  @method  Deleted
 *  @access  private
 */

router.delete("/:id",verfytokenAndAuturiztion,asyncHandler(async(req,res)=>{
    const instractor =await Instractor.findById(req.params.id)
    if(instractor){
        await Instractor.findByIdAndDelete(req.params.id)
        res.status(200).json({massage:"The instractor Is Deleted"})
    }else{
        res.status(404).json({massage:"instractor Not Found"})
    }
}))

module.exports=router;