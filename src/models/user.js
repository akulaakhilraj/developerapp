const mongoose=require("mongoose");
const validator=require("validator");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:40,
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,  //No duplicate
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Need a valid Email id")
           }
        }
    }, 
    age:{
        type:String,
        min:18,
    },
    
    PhoneNo: {
    type:String,
    required:true,
    validate(value) {
    if (!validator.isMobilePhone(value)) {
      throw new Error("Need a valid Phone Number");
    }
  }
},
    password:{
        type:String,
         validate(value){
           if(!validator.isStrongPassword(value)){
            throw new Error("Need a Strong Valid Password");
           }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error ("Gender validation is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://tse3.mm.bing.net/th/id/OIP.DIL3U7SxMklew2-3p82DXQHaHa?pid=Api&P=0&h=220",
         validate(value){
           if(!validator.isURL(value)){
            throw new Error("Need a valid  PhotoUrl");
           }
        }
    },
    about:{
        type:String,
        default:"Update with about skills",
    },
    skills:{
        type:[String]
    }
}, {timestamps:true})

module.exports=mongoose.model("User", userSchema)

