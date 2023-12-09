const express=require("express");
const {getAllCoureses,getCourseByID,postCourses,putCoureses,deleteCourses}=require("../controllers/couresesController");
const router=express.Router();

/*_______________API_______________*/
router.get("/",getAllCoureses)

router.get("/:id",getCourseByID)

router.post("/",postCourses)

router.put("/:id",putCoureses)

router.delete("/:id",deleteCourses)

//exports
module.exports=router;