const express = require('express')
const route = express.Router()
const musicModel = require('../controllers/music')

route.post("/createMusic",musicModel.CreateMusic)
route.get("/getMusicAll",musicModel.get_all_music)
route.get("/getMusic/:id",musicModel.FindMusicById)
route.get("/getMusictype/:type",musicModel.FindByType)
route.delete("/deleteMusic/:id",musicModel.deleteMusicById)
module.exports = route