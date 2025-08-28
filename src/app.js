const express=require("express");
const connectDB=require("./config/database");
const cookieParser=require("cookie-parser");
const app= express();
const PORT=9000;

app.use(express.json())
app.use(cookieParser());


const authRouter=require("./router/auth");
const profileRouter=require("./router/profile");
const requestRouter=require("./router/request.js")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


app.patch("/user/:userId", async(req,res)=>{
    const userId=req.params?.userId; //checks the user req holds the parameter userid
    console.log("userId", userId);
    console.log("UserId:",userId);
    const data=req.body;
    console.log("data:", data)
    try{
        const ISALLOWED_UPDATE=["userId","photoUrl","skills", "gender","age","about"]
        const isAllowedUpdate=Object.keys(data).every((k)=>ISALLOWED_UPDATE.includes(k))
        console.log("IsAllowedUpdate:", isAllowedUpdate);
        if(!isAllowedUpdate){
           throw new Error("Update is not allowed now")
        }
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10");
        }

       const user= await User.findByIdAndUpdate({_id:userId}, data, { 
        returnDocument:"after",
       runValidators:true //To update the data
       })
        res.send("Successfully updated")
    }
    catch(err){
        res.status(400).send("Something went wrong"+ err.message)
    }
})







app.delete("/user", async(req,res)=>{
    const userId=req.body.userId
    console.log("Received userId:", req.body.userId);
    try{
        const users=await User.findByIdAndDelete(userId)
        console.log(users)
        res.send("User Id is deleted");
    }catch(err){
        res.status(404).send("Nothing is found")
    }
})

connectDB().then(()=>{
    console.log("DataBase Connection is Successfully connected");
    app.listen(PORT,()=>{
        console.log(`Server is listening on the number ${PORT}`);
    })
   
}).catch((err)=>{
    console.log("Database connection is not connected", err.message);
})



