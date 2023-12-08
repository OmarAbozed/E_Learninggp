fetch("http://localhost:9000/api/courses").then((res)=>{
    console.log(res.data)
})
.catch((err)=>{
    console.log(err)
})