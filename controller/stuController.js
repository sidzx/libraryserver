const students=require('../model/stuSchema')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    console.log("inside register func")
    const {name,dob,gender,address,age,email,password}=req.body
    const profile=req.file.filename
    console.log(profile)
    console.log(`name:${name}`)
    try{
        const existingStudent= await students.findOne({email})
        if (existingStudent){
            res.status(406).json("Existing Student")
        }
        else{
            const newStudents=await students({name,dob,gender,address,age,email,password,profile})
            await newStudents.save()
            res.status(200).json("registered succesully")
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}
exports.login=async(req,res)=>{
    console.log("inside log in function")
    const {email,password}=req.body
    try{
        const existingStudent=await students.findOne({email,password})
        if(existingStudent && existingStudent.isAdmin===true){
            const token =jwt.sign({userId:existingStudent._id},"yo")
            res.status(200).json(
                {existingStudent,
                role:"Admin",
                token}
            )
        }
        else if(existingStudent){
            const token=jwt.sign({userId:existingStudent._id},"yo")
            res.status(200).json({
                existingStudent,
                role:"student",
                token
            })
        }
        else{
            res.status(406).json("invalid email or password")
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)

    }
}
exports .verifyEmail=async(req,res)=>{
    console.log("inside verify email")
    const {email}=req.body
    try{
        
        const existingStudent= await students.findOne({email})
        console.log(existingStudent)
        if (existingStudent){
            res.status(200).json(existingStudent)
        }
        else{
            
            res.status(406).json("email not found")
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
    
}
exports.resetPassword=async(req,res)=>{
    console.log("inside password reset")
    const {password}=req.body
    console.log(password)
    const {id}=req.params
    console.log(id)
    try{
        const existingStudent=await students.findOneAndUpdate({_id:id},{password})
        if(existingStudent){
           console.log(existingStudent)
            res.status(200).json(existingStudent)
            
        }
        else{
                res.status(406).json("id not found")
        }
    }
    catch(err){
        res.status(400).json("something went wrong" +err)
    }
    
}
exports.update=async(req,res)=>{
    console.log("inside update")
    const {id}=req.params
    try{
        const result=await students.findById({_id:id})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json("failed.."+err)
    }
}
exports.editAdmin=async(req,res)=>{
    console.log("inside edit function")
    const {name,dob,age,gender,email,password,address}=req.body
    console.log(`${name}`)
    const {uid}=req.params
    console.log(uid)
    const uploadFile=req.file?req.file.filename:req.body.profile
    try{
        const result =await students.findOneAndUpdate({_id:uid},{name,dob,gender,age,password,email,address,profile:uploadFile})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json("failed"+ err)
    }
}


exports.viewusers=async(req,res)=>{
    console.log("inside viewusers")
    try{
        const result=await students.find({isAdmin:false})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}
