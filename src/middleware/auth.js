const User=require("../models/user")
const jwt=require("jsonwebtoken");

const authUser=async(req,res,next)=>{
try{
    const {token}=req.cookies
    if(!token){
        throw new Error("Invalid token id")
    }
    const decodedObj= await jwt.verify(token,"DEV@TINDER789") 
    const {_id}=decodedObj
    const user=await User.findById({_id})
    if(!user){
        throw new Error("User not found")
    }
    req.user=user
    next();

}
catch(err){
    res.status(500).send("Error:" + err.message)
}
}
module.exports={authUser};




