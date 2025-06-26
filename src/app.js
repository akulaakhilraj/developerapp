const express=require("express");

const app=express();

app.use((req,res)=>{
    res.send("server is noted")
})


//Listen
app.listen(9000,()=>{
    console.log("server listening on 9000")
})



