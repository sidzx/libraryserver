const { URLValidator } = require('validators')
const books=require('../model/bookSchema')

const jwt =require('jsonwebtoken')

exports.addBook=async(req,res)=>{
    console.log("inside add book function")
    const {id,name,title,author,description,number,category,userId}=req.body
    const cover=req.file.filename
    console.log(`${id}`)
    console.log(cover)
    try{
        const existingBook=await books.findOne({id})
        if(existingBook){
            res.status(406).json("existing book")
        }
        else{
            const newBook=await books({id,name,title,author,description,number,cover,category,userId})
            await newBook.save()
            res.status(200).json("added successfully")
        }
    }
    catch(err){
        res.status(400).json("something went wrong"+err)
    }
}


exports.viewbooks=async(req,res)=>{
    console.log("inside viewbook")
    console.log(req.query)

    try{
        const searchKey=req.query.search
        const query={
            title:{$regex:searchKey,$options:"i"}
        }
        const result=await books.find(query)
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}
exports.bookview=async(req,res)=>{
    console.log("inside bookview")
 

    try{
       
        const result=await books.find()
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}



exports.deletebook=async(req,res)=>{
    console.log("inside delete book")
    const {id}=req.params
    try{
        const result=await books.deleteOne({_id:id})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}


exports.updatebook=async(req,res)=>{
    console.log("inside edit book details")
    const {id,title,author,category,description,number}=req.body
    console.log(`${id} ${title}`)
    const {uid}=req.params
    const uploadFile=req.file?req.file.filename:req.body.cover
    console.log(uid)
    
    try{
        const result=await books.findOneAndUpdate({_id:uid},{id,title,author,category,description,number,cover:uploadFile})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json("faield "+err)
    }
}
