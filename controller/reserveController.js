const books = require('../model/bookSchema')
const reserves=require('../model/reserveSchema')
const students=require('../model/stuSchema')


exports.reservebook=async(req,res)=>{
    console.log("inside reserve fucntion")
    const {bookid,studentid,bookingDate,bookName,studentName}=req.body
    console.log(`${bookid},${studentid},${bookingDate},${bookName},${studentName}`)
    console.log("hi")
    try{

        const reservedAlready=await reserves.findOne({bookid,studentid})
        console.log("hi")
        if(reservedAlready){
            console.log("no")
            res.status(406).json("already taken")
        }
        else{
            console.log("hi")
            const newReserves= await reserves({bookid,studentid,bookingDate,returnDate:"",status:"reserved",bookName,studentName})
            await newReserves.save()
            console.log("sii")
            res.status(200).json(newReserves)
        }
       
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
    
}

exports.getdetails=async(req,res)=>{

    console.log("inside getstudent details fucntion")
    const {id}=req.params
    try{
        const details=await students.findOne({_id:id})
        console.log(details)
        res.status(200).json(details)
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }

}
exports.decrease=async(req,res)=>{
    console.log("inside decrease function")
    const {id}=req.params
    try{
        const result=await books.findOne({_id:id})
        if(result.number>0){
            result.number=result.number-1
            await result.save()
            console.log(result)
            res.status(200).json(result)
        }
        else{
            res.status(200).json("out of stock")
        }
       
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}
exports.history=async(req,res)=>{
    console.log("fetching history")
    const {id}=req.params
    try{
        const result =await reserves.find({studentid:id})
        console.log(result)
        res.status(200).json(result)

        
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
   
}
exports.return=async(req,res)=>{
    console.log("inside return function")
    const {id}=req.params
    const {returnDate}=req.body

    console.log(returnDate)

    try{
        const result=await reserves.findOneAndUpdate({_id:id},{returnDate:returnDate,status:"pending"})
        console.log(result)
        res.status(200).json(result)
        
        
    }
    catch(err){
        res.status(400).json("something went wrong"+err)

    }
}
exports.reserveDetails=async(req,res)=>{
    console.log("inside fetching reserved books")
    try{
    
        const result =await reserves.find()
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}
exports.approved=async(req,res)=>{
    const {id}=req.params
    // const {id}=req.body
    console.log("inside approving function")
    try{
       
        const result1=await reserves.findOneAndUpdate({_id:id},{status:"Approved"})
        console.log(result1)
        res.status(200).json(result1)
           
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}

exports.increase=async(req,res)=>{
    const {id}=req.params
    console.log("inside incrementing function")
    try{
        const result=await books.findOne({_id:id})
        result.number++
        await result.save()
        console.log(result)
        res.status(200).json(result)
    }
   

    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}