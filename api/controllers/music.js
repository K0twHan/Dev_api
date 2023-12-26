const mongoose = require('mongoose');
const MusicModel = require('../models/music');


exports.get_all_music =async (req,res,next) =>{
   await MusicModel.find().select("_id name type time ")
    .exec()
    .then(docs => {
        res.status(200).json({
            
            musics : docs.map(doc =>{
                return {
                    _id : doc.id,
                    name : doc.name,
                    type : doc.type,
                    time : doc.time,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/music/getMusic/" + doc._id
                    }
                }
            })
        })
    })
}

exports.CreateMusic = (req,res,next) => {
    const music = new MusicModel({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        type : req.body.type,
        time : req.body.time
    })
    music.save()
    .then( result =>{
        res.status(201).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
    
}

exports.FindMusicById = (req,res,next) =>{
    MusicModel.findById(req.params.id).select(" name type time ")
    .exec()
    .then(doc =>{
        console.log("veritabanından bulunan muzik",doc);
        if(doc)
        {
            res.status(200).json({
                music : doc,
                request : {
                    type : "GET"
                }
            })
        }
    })
    .catch(err =>{
        console.log(err),
        res.status(500).json({
            error : err
        })
    })
}

exports.FindByType = (req,res,next) => {
    MusicModel.find({type : req.params.type})
    .exec()
    .then(docs => {
        res.status(200).json({
            
            musics : docs.map(doc =>{
                return {
                    _id : doc.id,
                    name : doc.name,
                    type : doc.type,
                    time : doc.time,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/music/getMusic/" + doc._id
                    }
                }
            })
        })
    })
                

                
            
        
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error : err
        })
    })
}


exports.deleteMusicById = (req,res,next) => {
    MusicModel.findByIdAndDelete(req.params.id)
    .exec()
    .then(doc =>{
        res.status(200).json({
            message : "Music deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}
