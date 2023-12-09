const mongoose=require("mongoose");
const Joi=require("joi");

//validation by mongoose

const CoursesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:255,

    },
    price:{
        type:Number,
        min:1,
        required:true
        
    },
    field:{
        type:String,
        minLength:1,
        maxLength:255,
        
        
    },
    contint:{
        type:String,
        
        minLength:1
    },
    instractor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "instractor",
    }
},{timestamps:true})
const Courses=mongoose.model("Courses",CoursesSchema);


//validation by JOI to create new courses

function ValidationCreateCoures(obj){
const schema=Joi.object({
    title:Joi.string().trim().required().min(3),
    price:Joi.number().min(1).required(),
    field:Joi.string().min(1).max(100),
    contint:Joi.string().min(1),
    instractor: Joi.string().required(),
})
return schema.validate(obj)
}

//validation by JOI to Update courses

function ValidationUpdateCoures(obj){
    const schema=Joi.object({
        title:Joi.string().trim().min(3),
        price:Joi.number().min(1),
        field:Joi.string().min(10).max(100),
        contint:Joi.string().min(1),
        instractor: Joi.string()
    })
    return schema.validate(obj)
    }


    module.exports={
        Courses,
        ValidationCreateCoures,
        ValidationUpdateCoures
    }