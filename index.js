require('dotenv').config()
const express=require('express')
const cors=require('cors')
const server=express()
server.use(express.json())
server.use(cors())

const route=require('./routes/routes')
server.use(route)

const PORT=process.env.PORT || 4000
require('./connection')

server.use('/upload',express.static('./uploads'))

server.listen(PORT,()=>{
    console.log("server is running successufully at port:",PORT)
})
server.get('/',(req,res)=>{res.send("server is running live")})