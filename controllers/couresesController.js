const asynchandler=require("express-async-handler");
const{Courses,ValidationCreateCoures, ValidationUpdateCoures}=require("../models/Courses")

/**
 *  @desc    Get all Coureses
 *  @route   /api/coureses
 *  @method  GET
 *  @access  public
 */

function getAllCoureses(){
    asynchandler(async(req,res)=>{
        const courses=await Courses.find(req.body);
        res.status(200).json(courses)
    })
}

/**
 *  @desc    Get Coureses By ID
 *  @route   /api/coureses/:id
 *  @method  GET
 *  @access  public
 */

function getCourseByID(){
    asynchandler(async(req,res)=>{
        const Course=await Courses.findById(req.params.id)
        if(Course){
            res.status(200).json(Course)
        }else{
            res.status(404).json({massage:"The Courese Not Found"})
        }
    })
}

/**
 *  @desc    post  Coureses
 *  @route   /api/coureses
 *  @method  POST
 *  @access  public  that by praivt after some time
 */

async function postCourses(req, res) {
    console.log("flag1");
    try {
    console.log("flag2");
    const { error } = ValidationCreateCoures(req.body);
    if (error) {
        return res.status(400).json({ massage: error.details[0].message });
    }
    const course = new Courses({
        title: req.body.title,
        price: req.body.price,
        field: req.body.field,
        contint: req.body.contint,
        instractor:req.body.instractor
    });
  
    await course.save();
    res.status(200).json(course);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "error :)" });
    }
  }
/**
 *  @desc    update  Coureses
 *  @route   /api/coureses
 *  @method  put
 *  @access  public  that by praivt after some time
 */

function putCoureses(){
    asynchandler(async(req,res)=>{
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
    })
}

/**
 *  @desc    delete  Coureses
 *  @route   /api/coureses
 *  @method  delete
 *  @access  public  that by praivt after some time
 */

function deleteCourses(){
    asynchandler(async(req,res)=>{
        const course=await Courses.findById(req.params.id);
        if(course){
            await Courses.findByIdAndDelete(req.params.id)
            res.status(200).json({massage:"Coures Is Deleted"})
        }else{
            res.status(404).json({massage:"Not Founded"})
        }
    
    })
}



module.exports={
    getAllCoureses,
    getCourseByID,
    postCourses,
    putCoureses,
    deleteCourses
}