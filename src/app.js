const express=require("express");
const connectDB=require("./config/database");
const User=require("./models/user");
const bcrypt=require("bcrypt");
const validator=require("validator");
const cookieParser=require("cookie-parser");
const { validatorSignUpData }=require("./utils/validator");
const jwt = require("jsonwebtoken");
const authUser=require("./middleware/auth")
const app= express();
const PORT=9000;

//Which connect req body fields
app.use(express.json())
app.use(cookieParser());

app.post("/signup", async(req,res)=>{ 
try{
    validatorSignUpData(req);
    const {firstName, lastName,emailId, password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const user= new User({
    firstName, 
    lastName,
    emailId,
    password:passwordHash
})
    await user.save()
    console.log('USER', user);
    res.status(200).send("User data is succesfully done")
}
catch(err){
    res.status(400).send({ error: err.message });
}
})

//Login Check whether the login id and password same or not

app.post("/login", async(req,res)=>{
   try{
    const {emailId,password}=req.body
    const user= await User.findOne({emailId:emailId})
    if(!user){
        throw new Error("Invalid Login Creditanls")
    }
    const ispasswordValid= await user.passwordValid(password)
    if(ispasswordValid){
        const token =await user.getJWT()
        res.cookie("token",token)
        res.send("Login Successful")
    }else{
        throw new Error("Incorrect Login creditals")
    }
   }
   catch(error){
    res.status(400).send({ error: error.message });
   }
})


app.get("/profile",authUser, async(req,res)=>{
    try{
        const user=req.user
        res.send(user)
    }
    catch(err){
        throw new Error("Error", err.message);
    }
})



app.get("/feed", async(req,res)=>{
    const UserEmailId=req.body.emailId;
    try{
        const users=await User.find({emailId:UserEmailId});
        if(users.length===0){
            res.status(404).send("Nothing is Found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(404).send("User not found")
    }
})

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



