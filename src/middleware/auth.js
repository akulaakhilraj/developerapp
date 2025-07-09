const Adminauth= (req,res,next)=>{
    console.log("Is Admin Checked");
    const token="xyz";
    const isAuthorized=token==="xyz"
    if(!isAuthorized){
        res.status(401).send("Not authorised");
    }
    else{
        next()
    }
}


module.exports={
    Adminauth
}