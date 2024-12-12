const mongoose = require('mongoose')

const connectString = process.env.DATABASE

mongoose.connect(connectString).then((res) => {
    console.log('Mongo DB connected suucessfully')
}).catch((res) => {
    console.log('connection failed')
})