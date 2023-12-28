const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

const number = 10

exports.Signup_User = (req,res,next) => {
    userModel.find({email : req.body.email}).exec()
    .then(user =>{
        if(user.length >= 1)
        {
            res.status(500).json({
                error : "Mail exist"
            })
        }
        else
        {
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                {
                    res.status(500).json({
                        error : err
                    })
                }
                else{
                    const user = new userModel({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    })
                    user.save()
                    
                    .then(user => {
                        console.log(user)
                        res.status(201).json({
                            message : "user created"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error : err
                        })
                    })
                }
            })
        }
    })
    

}

exports.Login_User = (req,res,next) => {
    userModel.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1)
        {
          return  res.status(500).json({
                error : "Wrong email"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) => {
            if(err)
            {
                res.status(500).json({
                    error : "Wrong Password"
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id
                },process.env.JWT_KEY,{
                    expiresIn : "1h"
                })
                return res.status(200).json({
                    message : "Auth Succesful",
                    token : token
                })
            }
            res.status(401).json({
                message : "Auth failed"
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : err
        })
    })
}
