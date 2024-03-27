const express = require("express")
const router = express.Router()
const Room = require("../controllers/room")
const asyncWrapper = require("../utils/asyncWrapper")
const isAuthorized = require("../middlewares/isAuthorized")
const { validateRoomPayload } = require("../middlewares/validatePayload")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/', asyncWrapper(async (req, res) => {
    const rooms = await Room.getAllRooms(req)
    res.status(200).json({ rooms, count: rooms.length })
}))

router.get('/:roomId', asyncWrapper(async (req, res) => {
    const { roomId } = req.params
    const room = await Room.getRoom(roomId)
    res.status(200).json({ room })
}))

router.post('/',
    asyncWrapper(validateRoomPayload),
    asyncWrapper(isAuthenticated),
    asyncWrapper(isAuthorized),
    asyncWrapper(async (req, res) => {
        const { name, roomType, price } = req.body
        const newRoom = await Room.createRoom({ name, roomType, price })
        res.status(200).json({ room: newRoom })
    }))

router.patch('/:roomId',
    asyncWrapper(validateRoomPayload),
    asyncWrapper(isAuthenticated),
    asyncWrapper(isAuthorized),
    asyncWrapper(async (req, res) => {
        const edit = req.body
        const { roomId } = req.params
        const room = await Room.editRoom(roomId, edit)
        res.status(200).json({ room })
    }))

router.delete('/:roomId',
    asyncWrapper(validateRoomPayload),
    asyncWrapper(isAuthenticated),
    asyncWrapper(isAuthorized),
    asyncWrapper(async (req, res) => {
        const { roomId } = req.params
        await Room.deleteRoom(roomId)
        res.status(200).json({ success: true, msg: `room deleted successfully.` })
    }))

module.exports = router