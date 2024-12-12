const mongoose=require("mongoose")
const bookSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true,
    },
    cover:{
        type:String,
        required:true,
    },
    description:{
        type:String,required:true,

    },
    userId:{
        type:String,
        required:true,    
    }
})
const books=mongoose.model("books",bookSchema)
module.exports=books