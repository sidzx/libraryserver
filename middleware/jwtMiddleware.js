const jwt=require('jsonwebtoken')
const jwtMiddlware=async(req,res,next)=>{
    console.log("inside jwt function")
    console.log(req.headers)
    try{
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const result=jwt.verify(token,"yo")
        console.log(result)
        req.payload=result.userId
        next()
    }
    catch(err){
        res.status(400).json("Authoriztion failed...login first"+err)
    }
}
module.exports=jwtMiddlware