const { Schema, model } = require("mongoose")

const room = new Schema({
    name: {
        type: String,
        required: [true, "name field is required"]
    },
    roomType: {
        type: String,
        required: [true, "roomType field is required"]
    },
    price: {
        type: Number,
        required: [true, "price field is required"]
    }
}, { timestamps: true })

module.exports = model("room", room)