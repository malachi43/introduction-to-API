require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const PORT = process.env.PORT || 3000
const connectDatabase = require("./database/database")
const roomRoute = require("./routes/room")
const roomTypeRoute = require("./routes/room-type")
const userRoute = require("./routes/user.route")
const {validateUserPayload} = require("./middlewares/validatePayload")
const errorHandler = require("./middlewares/errorHandler")
const asyncWrapper = require("./utils/asyncWrapper")
const isAuthenticated = require("./middlewares/isAuthenticated")
const { join } = require("path")

//add json to req.body
app.use(express.json())
//add form-data to req.body
app.use(express.urlencoded({ extended: false }))

//allow cross-origin resource sharing.
app.use(cors())

app.use(morgan("tiny"))

//index page
app.get(`/`, (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})

//middlewares
app.use("/api/v1/users", asyncWrapper(validateUserPayload), userRoute)
app.use(`/api/v1/room-types`, asyncWrapper(isAuthenticated), roomTypeRoute)
app.use(`/api/v1/rooms`, asyncWrapper(isAuthenticated), roomRoute)
app.use(errorHandler)

async function startServer() {
    await connectDatabase(process.env.DATABASE_URL)

    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}.Press Ctrl+C to terminate.`)
    })
}

startServer()
