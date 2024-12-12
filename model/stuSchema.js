const mongoose=require('mongoose')
const validators=require('validator')
const stuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validators.isEmail,"Invalid Email"]
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
})

const students=mongoose.model("students",stuSchema)
module.exports=students