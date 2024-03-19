const express = require("express")
const router = express.Router()
const Room = require("../controllers/room")

router.get('/', async (req, res) => {
    const rooms = await Room.getAllRooms(req)
    res.status(200).json({ rooms, count: rooms.length })
})

router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params
    const room = await Room.getRoom(roomId)
    res.status(200).json({ room })
})

router.post('/', async (req, res) => {
    const { name, roomType, price } = req.body
    const newRoom = await Room.createRoom({ name, roomType, price })
    res.status(200).json({ room: newRoom })
})

router.patch('/:roomId', async (req, res) => {
    const edit = req.body
    const { roomId } = req.params
    const room = await Room.editRoom(roomId, edit)
    res.status(200).json({ room })
})

router.delete('/:roomId', async (req, res) => {
    const { roomId } = req.params
    await Room.deleteRoom(roomId)
    res.status(200).json({ success: true, msg: `room deleted successfully.` })
})

module.exports = router