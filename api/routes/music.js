const express = require('express')
const route = express.Router()
const musicModel = require('../controllers/music')
const check_auth = require('../Auth/check_auth')

route.post("/createMusic",check_auth,musicModel.CreateMusic)
route.get("/getMusicAll",check_auth,musicModel.get_all_music)
route.get("/getMusic/:id",check_auth,musicModel.FindMusicById)
route.get("/getMusictype/:type",check_auth,musicModel.FindByType)
route.delete("/deleteMusic/:id",check_auth,musicModel.deleteMusicById)
module.exports = route