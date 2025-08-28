const express=require("express")
const profileRouter=express.Router()
const { authUser }=require("../middleware/auth")

profileRouter.get("/profile", authUser, async(req,res)=>{
    try{
        const user=req.user
        res.send(user, "User profile is fetched")
    }
    catch(err){
        throw new Error("Error", err.message);
    }
})


module.exports=profileRouter;