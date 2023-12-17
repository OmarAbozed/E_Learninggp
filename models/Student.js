const mongoose=require("mongoose");
const Joi=require("joi");

const StudentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlingth:2,
        maxlingth:50,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlingth:5,
        maxlingth:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlingth:2,
        
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        minlingth:11,
        maxlingth:11,

    },
    image: {
        type: String,
        default: "default-avatar.png"
    },
    verified:{
        type:Boolean,
        default:0
    },
    verifyBy:{
        type:String,
      //enum:['LINK','OTP']
    }
    


},{timestamps:true})
const Student=mongoose.model("Student",StudentSchema);

//validation to Register User

function ValidationRegisterStudnet(obj){
    const schema=Joi.object({
        username:Joi.string().trim().min(2).max(50).required(),
        email:Joi.string().trim().min(5).max(50).required().email(),
        password:Joi.string().min(2).required(),
        phone:Joi.string().min(11).max(11).required(),
        image:Joi.string(),
        verifyBy:Joi.required(),
        
    })
    return schema.validate(obj)
}

//validation to Login User
function ValidationLoginStudent(obj){
    const schema=Joi.object({
        
        email:Joi.string().trim().min(5).max(50).required().email(),
        password:Joi.string().min(2).required(),
        
    })
    return schema.validate(obj)
}

function ValidationUpdateStudent(obj){
    const schema=Joi.object({
        username:Joi.string().trim().min(2).max(50),
        email:Joi.string().trim().min(5).max(50).email(),
        password:Joi.string().min(2),
        phone:Joi.string().min(11).max(11),
        image:Joi.string()
        
    })
    return schema.validate(obj)
}

module.exports={
    Student,
    ValidationLoginStudent,
    ValidationRegisterStudnet,
    ValidationUpdateStudent
}