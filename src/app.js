const express=require("express");
const connectDB=require("./config/database");
const User=require("./models/user")
//const connec=require("./config/database")
const app= express();
const PORT=9000;

app.post("/signup", async(req,res,next)=>{
    const user=new User({
    firstName:"Akhil Raj",
    lastName:"Akula",
    emailId:"akulaakhilraj1997@gmail.com",
    age:28,
    gender:"male"
})
try{
     await user.save()
    res.status(200).send("User data is succesfully done")

}
catch(err){
    res.status(401).send("Getting error", err.message);
}
   
})

connectDB().then(()=>{
    console.log("DataBase Connection is Successfully connected");
    app.listen(PORT,()=>{
        console.log(`Server is listening on the number ${PORT}`);
    })
   
}).catch(()=>{
    console.log("Database connection is not connected")
})



