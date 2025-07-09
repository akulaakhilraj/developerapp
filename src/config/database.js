const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://akulaakhilraj:8ooYYlbuQQC9vKX2@nnode.p1qkyxx.mongodb.net/devTinderApp")
}

module.exports=connectDB;




// const mongoose=require("mongoose");

// const connectDataBase=async()=>{
//     await mongoose.connect("mongodb+srv://akulaakhilraj:8ooYYlbuQQC9vKX2@nnode.p1qkyxx.mongodb.net/devTinder")
// }

// module.exports=connectDataBase;