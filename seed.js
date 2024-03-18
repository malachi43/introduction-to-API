require("dotenv").config()
const mongoose = require("mongoose")
const connectDatabase = require("./database/database")
//array holding room names
const roomNames = ["Cozy Haven", "Dream Retreat", "Comfort Cove", "Restful Hideaway", "Dreamy Dwelling"]
//array holding room types.
const types = ["Deluxe", "Studio", "Suite", "Executive", "Duplex"]

const rooms = []
const roomTypes = []

function generatePrice(priceRange) {
    return Math.floor(Math.random() * priceRange) + 1
}
for (let i = 0; i < 5; i++) {
    roomTypes.push({ name: types[i], _id: new mongoose.Types.ObjectId() })
    rooms.push({ name: roomNames[i], roomType: roomTypes[i]._id, price: generatePrice(1200) })
}



async function seedDatabase() {
    await connectDatabase(process.env.DATABASE_URL)

    const Room = require("./models/room")
    const RoomType = require("./models/room-type")

    //This helps to re-seed the database with fresh documents.
    await Room.deleteMany()
    await RoomType.deleteMany()

    await Room.insertMany(rooms)
    await RoomType.insertMany(roomTypes)

}

seedDatabase()
    .then(() => {
        console.log(`database successfully seeded.`)
    })
    .catch(error => {
        console.log(`Error: `, error.message)
    })
