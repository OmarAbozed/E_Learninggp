const mongoose=require("mongoose");
const Joi=require("joi");

const InstructorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:50,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minLength:5,
        maxLength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:2,
        
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        minLength:11,
        maxLength:11,

    },
    image: {
        type: String,
        default: "default-avatar.png"
    }
    ,
    IsAdmin:{
        type:Boolean,
        default:false
        
    }


},{timestamps:true})


//validation to register instructor



function ValidationRegisterInstructor(obj){
    const schema=Joi.object({
        username:Joi.string().trim().min(2).max(50).required(),
        email:Joi.string().trim().min(5).max(50).required().email(),
        password:Joi.string().min(2).required(),
        phone:Joi.string().min(11).max(11).required(),
        image:Joi.string()
        
    })
    return schema.validate(obj)
}

//validation to Login Instractor
function ValidationLoginInstractor(obj){
    const schema=Joi.object({
        
        email:Joi.string().trim().min(5).max(50).required().email(),
        password:Joi.string().min(2).required(),
        
    })
    return schema.validate(obj)
}

function ValidationUpdateInstractor(obj){
    const schema=Joi.object({
        username:Joi.string().trim().min(2).max(50),
        email:Joi.string().trim().min(5).max(50).email(),
        password:Joi.string().min(2),
        phone:Joi.string().min(11).max(11)
        
    })
    return schema.validate(obj)
}
const Instractor=mongoose.model("Instactors",InstructorSchema);

module.exports={
    Instractor,
    ValidationLoginInstractor,
    ValidationRegisterInstructor,
    ValidationUpdateInstractor
}