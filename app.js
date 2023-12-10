const express=require("express");
const mongoose=require("mongoose");
// const ConnectingTodatabase = require("./config/db");
require("dotenv").config();
const path  = require('path');
const cors = require('cors');
var logger = require("morgan");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connecting To DataBase In Mongoose"))
.catch((error)=>console.log("Filed To Connecting DataBase"))
const app=express();


//pathes:
const coursesPath=require("./routes/course");
const AuthStu=require("./routes/authStu");
const AuthInstr=require("./routes/authInstractor");
const studentPath=require("./routes/student")
const instractorPath=require("./routes/instractor")
const verifypath = require('./routes/verifyStudent');
const classifypath = require('./routes/classify');

app.use(
    cors({
    origin: "*",
    credentials: true,
    })
);


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.json());
app.use("/static",express.static(path.join(__dirname,"public")))
app.use(logger("dev"));


app.use("/api/courses",coursesPath);
app.use("/api/auth",AuthStu);
app.use("/api/authInstractour",AuthInstr);
app.use("/api/student",studentPath)
app.use("/api/instractor",instractorPath)
app.use("/api/verify",verifypath)
app.use("/api/classify",classifypath)



const Port=process.env.PORT||9000;
app.listen(Port,()=>{
    console.log(`running on port ${Port}`)
})