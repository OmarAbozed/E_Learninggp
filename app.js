const express=require("express");
const ConnectingTodatabase = require("./config/db");
require("dotenv").config();
const path  = require('path');

const app=express();


//pathes:
const coursesPath=require("./routes/course");
const AuthStu=require("./routes/authStu");
const AuthInstr=require("./routes/authInstractor");
const studentPath=require("./routes/student")
const instractorPath=require("./routes/instractor")
const verifypath = require('./routes/verifyStudent');

//connecting to database
ConnectingTodatabase();

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.json());
app.use("/static",express.static(path.join(__dirname,"public")))


app.use("/api/courses",coursesPath);
app.use("/api/auth",AuthStu);
app.use("/api/authInstractour",AuthInstr);
app.use("/api/student",studentPath)
app.use("/api/instractor",instractorPath)
app.use("/api/verify",verifypath)



const Port=process.env.PORT||9000;
app.listen(Port,()=>{
    console.log(`running on port ${Port}`)
})