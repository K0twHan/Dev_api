const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{

    try
    {
        const decoded = jwt.verify(req.body.token,process.env.JWT_KEY)
        req.userData = decoded
        next()
    }
    catch(error)
    {
        return res.status(500).json({
            message : "Auth failed"
        })
    }

}