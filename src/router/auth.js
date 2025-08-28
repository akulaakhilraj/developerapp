const express=require("express")
const authRouter=express.Router()
const { validatorSignUpData }=require("../utils/validator");
const bcrypt=require("bcrypt");
const User=require("../models/user");
//const jwt = require("jsonwebtoken");
//const getJWT=require("../models/user")

authRouter.post("/signup", async(req,res)=>{ 
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



authRouter.post("/login", async(req,res)=>{
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


module.exports=authRouter;