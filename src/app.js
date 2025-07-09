const express=require("express");
const app= express()

const {Adminauth}=require("./middleware/auth");

app.use("/admin", Adminauth);


// app.get("/user", (req,res)=>{
//     res.send("Is user get logged");
// })
app.get("/admin/getalldata",(req,res)=>{
    res.send("Is Authorized");
})

app.get("/admin/getdeletedata",(req,res)=>{
    res.send("Authorized and Deleted")
})


const PORT=9000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on the ${PORT}`
    )
})

