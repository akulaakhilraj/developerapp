const express=require("express");
const app=express();

//Handling request
app.use((req,res)=>{
    res.send("server is restarted and running smoothly on the dev")
})

//Listen
app.listen(9000,()=>{
    console.log("server listening on 9000")
})
