const mongoose=require("mongoose");
async function ConnectingTodatabase(){
await mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connecting To DataBase In Mongoose"))
.catch((error)=>console.log("Filed To Connecting DataBase"))
}
module.exports=ConnectingTodatabase;