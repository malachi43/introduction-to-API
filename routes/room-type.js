const express = require("express")
const router = express.Router()
const RoomType = require("../controllers/roomType")

router.get('/', async (req, res) => {
    const roomTypes = await RoomType.getAllRoomTypes()
    res.status(200).json({ roomTypes, count: roomTypes.length })
})

router.post('/', async (req, res) => {
    const { name } = req.body
    const newRoomType = await RoomType.createRoomType({ name })
    res.status(200).json({ roomType: newRoomType })
})

module.exports = router