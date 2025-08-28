const express=require("express");
const { authUser } = require("../middleware/auth");
const requestRouter=express.Router()

requestRouter.post("./sendConnectRequest", authUser, (req,res)=>{
    const user=req.user;
    console.log("Connection reuqestion sent by the user ")
    res.send(user.firstName + "sent the connection Request");
})

module.exports=requestRouter;
