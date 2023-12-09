const express=require("express");
const router=express.Router();
const asynchandler=require("express-async-handler");
const {Classify,ValidationCreateClassify,ValidationUpdateClassify} = require('../models/Classify');


/**
 *  @desc    Get all Classify
 *  @route   /api/coureses
 *  @method  GET
 *  @access  public
 */

router.get("/",asynchandler(async(req,res)=>{
    const classify=await Classify.find({price:{$nin:1099}});
    res.status(200).json(classify)
}))

/**
 *  @desc    Get Coureses By ID
 *  @route   /api/coureses/:id
 *  @method  GET
 *  @access  public
 */

router.get("/:id",asynchandler(async(req,res)=>{
    const classify=await Classify.findById(req.params.id)
    if(classify){
        res.status(200).json(classify)
    }else{
        res.status(404).json({massage:"The classify Not Found"})
    }
}))

/**
 *  @desc    post  classify
 *  @route   /api/classify
 *  @method  POST
 *  @access  public  that by praivt after some time
 */

router.post("/",asynchandler(async(req,res)=>{
    const { error }=ValidationCreateClassify(req.body);
    if(error){
        return res.status(400).json({massage:error.details[0].message})
    }
    const classify=await new Classify({
        name:req.body.name
    })

    const result =await classify.save();
    res.status(200).json(result)
}))

/**
 *  @desc    update  classify
 *  @route   /api/classify
 *  @method  put
 *  @access  public  that by praivt after some time
 */


router.put("/:id",asynchandler(async(req,res)=>{
    const { error }=ValidationUpdateClassify(req.body);
    if(error){
        return res.status(400).json({massage:error.details[0].massage})
    }
    const updateclassify=await Classify.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name
        }
    },{new:true})
    res.status(200).json(updateclassify);
}))

/**
 *  @desc    delete  classify
 *  @route   /api/classify
 *  @method  delete
 *  @access  public  that by praivt after some time
 */


router.delete("/:id",asynchandler(async(req,res)=>{
    const classify=await Classify.findById(req.params.id);
    if(classify){
        await Classify.findByIdAndDelete(req.params.id)
        res.status(200).json({massage:"classify Is Deleted"})
    }else{
        res.status(404).json({massage:"Not Founded"})
    }

}))

//exports
module.exports=router;