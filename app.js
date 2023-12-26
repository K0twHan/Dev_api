const express = require('express')
const dbConnect = require('./config/dbConnect');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const musicRoute = require('./api/routes/music')
// http isteklerini öz bir şekilde gösteriyor eğer canlıya alınacaksa combined kullanabilirsin
app.use(morgan('dev'))
app.use("/uploads",express.static('uploads'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
dbConnect();

app.use("/music",musicRoute)


module.exports = app
