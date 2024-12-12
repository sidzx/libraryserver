const mongoose=require("mongoose")

const reserveSchema=new mongoose.Schema({
    bookid:{
        type:String,
        required:true
    },
    studentid:{
        type:String,
        required:true
    },
    bookingDate:{
        type:String,
        required:true
    },
    returnDate:{
        type:String,
        
    },
    status:{
        type:String,
        required:true
        
    },
    bookName:{
        type:String,
        required:true
    },
    studentName:{
        type:String,
        required:true
    }
})
const reserves=mongoose.model("reserves",reserveSchema)
module.exports=reserves