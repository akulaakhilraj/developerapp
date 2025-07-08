const express=require("express");
const app= express()

//Get the User Details 
app.get("/user", (req,res,next)=>{
    console.log("First Response")
   // res.send({FirstName:"Akhil Raj", LastName:"Akula", MobileNo:8886285838, email_id:"akulaakhilraj@gmail.com"})
    next();
},(req,res,next)=>{
    console.log("2nd Response")
   res.send("2nd Response Read")
    next();
})

//Post User Details

app.post("/user",(req,res)=>{
    
    res.send({FirstName:"Akula", LastName:"Akhil Raj", MobileNo:9058473822, email_id:"akulaakhil@gmail.com"}
    )
})

app.delete("/user",(req,res)=>{
    res.send({FirstName:"Akula Akhil", LastName:"Akhil Raj", MobileNo:9058473822, email_id:"akulaakhil@gmail.com"}
    )
})



const PORT=9000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on the ${PORT}`
    )
})

