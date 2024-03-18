require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const Room = require("./controllers/room")
const RoomType = require("./controllers/roomType")
const PORT = process.env.PORT || 3000
const connectDatabase = require("./database/database")

//add json to req.body
app.use(express.json())
//add form-data to req.body
app.use(express.urlencoded({ extended: false }))

//allow cross-origin resource sharing.
app.use(cors())

app.get('/api/v1/room-types', async (req, res) => {
    const roomTypes = await RoomType.getAllRoomTypes()
    res.status(200).json({ roomTypes, count: roomTypes.length })
})

app.post('/api/v1/room-types', async (req, res) => {
    const { name } = req.body
    const newRoomType = await RoomType.createRoomType({ name })
    res.status(200).json({ roomType: newRoomType })
})

app.post('/api/v1/rooms', async (req, res) => {
    const { name, roomType, price } = req.body
    const newRoom = await Room.createRoom({ name, roomType, price })
    res.status(200).json({ room: newRoom })
})

app.get('/api/v1/rooms', async (req, res) => {
    const rooms = await Room.getAllRooms(req)
    res.status(200).json({ rooms, count: rooms.length })
})

app.patch('/api/v1/rooms/:roomId', async (req, res) => {
    const edit = req.body
    const { roomId } = req.params
    const room = await Room.editRoom(roomId, edit)
    res.status(200).json({ room })
})

app.delete('/api/v1/rooms/:roomId', async (req, res) => {
    const { roomId } = req.params
    await Room.deleteRoom(roomId)
    res.status(200).json({ success: true, msg: `room deleted successfully.` })
})

app.get('/api/v1/rooms/:roomId', async (req, res) => {
    const { roomId } = req.params
    const room = await Room.getRoom(roomId)
    res.status(200).json({ room })
})


async function startServer() {
    await connectDatabase(process.env.DATABASE_URL)

    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}.Press Ctrl+C to terminate.`)
    })
}

startServer()
