const roomTypeModel = require("../models/room-type")

class RoomType {
    constructor() {
        this._RoomType = roomTypeModel
    }

    //CREATE ROOM-TYPE
    async createRoomType({ name }) {
        const newRoomType = new this._RoomType({ name })
        return await newRoomType.save()
    }

    //GET ALL ROOMS
    async getAllRoomTypes() {
        const rooms = await this._RoomType.find()
        return rooms
    }
}

module.exports = new RoomType()