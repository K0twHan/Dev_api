const mongoose = require('mongoose')

const musicSchema = mongoose.Schema({
    _id :  mongoose.Schema.Types.ObjectId ,
    name : { type : String, required : true},
    time : {type : String , required : true},
    type : {type : String , required : true}
})


module.exports = mongoose.model('Music',musicSchema)