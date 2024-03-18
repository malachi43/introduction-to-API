const { Schema, model } = require("mongoose")

const roomType = new Schema({
    name: {
        type: String,
        required: [true, "name field is required"]
    }
}, { timestamps: true })

module.exports = model("room-type", roomType)