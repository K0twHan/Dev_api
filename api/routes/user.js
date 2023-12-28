const express =require('express')
const router = express.Router()
const userController = require('../controllers/user')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, req.body.email + "-" + file.originalname)
    },
  })
  const uploadStorage = multer({ storage: storage })


router.post("/signup",uploadStorage.single("file"),userController.Signup_User)
router.post("/login",userController.Login_User)




module.exports = router