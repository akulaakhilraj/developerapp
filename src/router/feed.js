const express=require("express")
const feedRouter=express.Router()
const User=require("../models/user.js")

feedRouter.get("/feed", async(req,res)=>{
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


module.exports=feedRouter;