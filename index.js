require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3000
const connectDatabase = require("./database/database")
const roomRoute = require("./routes/room")
const roomTypeRoute = require("./routes/room-type")
const { join } = require("path")
const baseUrl = `https://introduction-to-api.onrender.com`

//add json to req.body
app.use(express.json())
//add form-data to req.body
app.use(express.urlencoded({ extended: false }))

//allow cross-origin resource sharing.
app.use(cors())

//index page
app.get(`/${baseUrl}/`, (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})

//middlewares
app.use(`${baseUrl}/api/v1/room-types`, roomTypeRoute)
app.use(`${baseUrl}/api/v1/rooms`, roomRoute)

async function startServer() {
    await connectDatabase(process.env.DATABASE_URL)

    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}.Press Ctrl+C to terminate.`)
    })
}

startServer()
