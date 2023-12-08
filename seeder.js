const{Courses}=require("./models/Courses");
const{courses}=require("./data");
const ConnectingTodatabase=require("./config/db");
require("dotenv").config();

//connection to database
ConnectingTodatabase();

//import coureses
const importCoureses=async()=>{
    try {
        await Courses.insertMany(courses)
        console.log("Coureses imported")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
//remove coureses
const removeCoureses=async()=>{
    try {
        await Courses.deleteMany()
        console.log("Coureses removed")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

if(process.argv[2]==="-import"){

    importCoureses()

}else if(process.argv[1]==="-remove"){
    removeCoureses()
}
