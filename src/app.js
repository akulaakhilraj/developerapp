const express=require("express");
const connectDB=require("./config/database");
const User=require("./models/user");
const user = require("./models/user");
const bcrypt=require("bcrypt");
const validator=require("validator");
const cookieParser=require("cookie-parser");
const { validatorSignUpData }=require("./utils/validator");
const jwt = require("jsonwebtoken");
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
    const {emailId, password}=req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("Email id is an error")
    }
    const user= await User.findOne({emailId:emailId})
    if(!user){
        throw new Error("User id not found");
    } 
    const passwordIsValid=await bcrypt.compare(password, user.password);
    if(passwordIsValid){
        const token=await jwt.sign({_id:user._id}, "DEV@1236$")
        console.log(token);
        res.cookie("token", token); ///pass to the user 
       // res.send("Reading a cookies")
        res.status(200).send("User Login Succesfull");
    }
    else{
        throw new Error("Invalid Login Credentails")
    }
    }
    catch(err){
        console.log("Error:",err.message);
       return res.status(404).json({ error: "Internal server error" });
    }
})

app.get("/profile", async(req,res)=>{
   try{
    const cookies=req.cookies;
    const {token}=cookies
    if(!token){
        throw new Error ("Token is not a valid one");
    }
    const decodedMessage=await jwt.verify(token, "DEV@1236$")
    const{_id}=decodedMessage;
    const user=User.findById(_id);
    if(!user){
        throw new Error("User is not the valid id ")
    }
    console.log("user logged with "+_id);
    return res.status(200).send(user)
   }
   catch(err){
    res.status(500).send(err.message)
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



