const mongoose=require("mongoose");
const Joi=require("joi");

const ClassifySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLingth:1,
        maxLingth:255,
    },
},{timestamps:true})
const Classify=mongoose.model("classify",ClassifySchema)

function ValidationCreateClassify(obj){
    const schema=Joi.object({
        name:Joi.string().min(1).max(255).required(),
    })
    return schema.validate(obj)
}

function ValidationUpdateClassify(obj){
    const schema=Joi.object({
        username:Joi.string().min(1).max(255),
    })
    return schema.validate(obj)
}
module.exports={
    Classify,
    ValidationCreateClassify,
    ValidationUpdateClassify
}