const express=require("express");
const connectDB=require("./config/database");
const User=require("./models/user");
const user = require("./models/user");
//const connec=require("./config/database")
const bcrypt=require("bcrypt");
const { validatorSignUpData }=require("./utils/validator");
const app= express();
const PORT=9000;

//Which connect req body fields
app.use(express.json())

app.post("/signup", async(req,res)=>{
    //console.log("Sign up doc ",req.body)
   // const user=new User(req.body)
try{
    validatorSignUpData(req);
    const {firstName, lastName,emailId, password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    console.log("passwordhash",passwordHash);
    //Creating an instance of a new user before save information
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
   // console.error("Validation Error:", err.message);
    res.status(400).send({ error: err.message });
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
        res.status(404).send("User not found ")
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
       runValidators:true
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
   
}).catch(()=>{
    console.log("Database connection is not connected")
})



