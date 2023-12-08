const express=require("express");
const router=express.Router();
const asynchandler=require("express-async-handler");
const{Courses,ValidationCreateCoures, ValidationUpdateCoures}=require("../models/Courses")



/**
 *  @desc    Get all Coureses
 *  @route   /api/coureses
 *  @method  GET
 *  @access  public
 */

router.get("/",asynchandler(async(req,res)=>{
    const courses=await Courses.find({price:{$nin:1099}});
    res.status(200).json(courses)
}))

/**
 *  @desc    Get Coureses By ID
 *  @route   /api/coureses/:id
 *  @method  GET
 *  @access  public
 */

router.get("/:id",asynchandler(async(req,res)=>{
    const Course=await Courses.findById(req.params.id)
    if(Course){
        res.status(200).json(Course)
    }else{
        res.status(404).json({massage:"The Courese Not Found"})
    }
}))

/**
 *  @desc    post  Coureses
 *  @route   /api/coureses
 *  @method  POST
 *  @access  public  that by praivt after some time
 */

router.post("/",asynchandler(async(req,res)=>{
    const { error }=ValidationCreateCoures(req.body);
    if(error){
        return res.status(400).json({massage:error.details[0].message})
    }
    const course=await new Courses({
        title:req.body.title,
        price:req.body.price,
        field:req.body.field,
        contint:req.body.contint
    })

    const result =await course.save();
    res.status(200).json(result)
}))


/**
 *  @desc    update  Coureses
 *  @route   /api/coureses
 *  @method  put
 *  @access  public  that by praivt after some time
 */


router.put("/:id",asynchandler(async(req,res)=>{
    const { error }=ValidationUpdateCoures(req.body);
    if(error){
        return res.status(400).json({massage:error.details[0].massage})
    }
    const updatecourse=await Courses.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            price:req.body.price,
            field:req.body.field,
            contint:req.body.contint
        }
    },{new:true})
    res.status(200).json(updatecourse);
}))

/**
 *  @desc    delete  Coureses
 *  @route   /api/coureses
 *  @method  delete
 *  @access  public  that by praivt after some time
 */


router.delete("/:id",asynchandler(async(req,res)=>{
    const course=await Courses.findById(req.params.id);
    if(course){
        await Courses.findByIdAndDelete(req.params.id)
        res.status(200).json({massage:"Coures Is Deleted"})
    }else{
        res.status(404).json({massage:"Not Founded"})
    }

}))

//exports
module.exports=router;