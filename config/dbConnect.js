const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Bağlantı başarı ile sağlandı")
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}

module.exports = dbConnect