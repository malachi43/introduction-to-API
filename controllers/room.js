const roomModel = require("../models/room")

class Room {
    constructor() {
        this._Room = roomModel
    }

    //CREATE A ROOM
    async createRoom({ name, roomType, price }) {
        const newRoom = new this._Room({ name, roomType, price })
        return await newRoom.save()
    }

    //GET ALL ROOMS
    async getAllRooms(req) {
        const queryObj = {}
        const { minPrice, maxPrice, roomType } = req.query
        if (minPrice) {
            queryObj.minPrice = { $gte: Number(minPrice) }
        }
        if (maxPrice) {
            queryObj.maxPrice = { $eq: Number(maxPrice) }
            queryObj.minPrice = minPrice ? { $gte: Number(minPrice) } : { $gte: 0 }
        }
        if (roomType) {
            queryObj.roomType = roomType
        }

        const rooms = await this._Room.find(queryObj)
        return rooms
    }

    //EDIT ROOM
    async editRoom(id, dataObj) {
        const editedRoom = await this._Room.findOneAndUpdate({ _id: id }, dataObj, {
            new: true, runValidators: true
        })
        return editedRoom
    }
    
    //DELETE A ROOM
    async deleteRoom(id) {
        const deletedRoom = await this._Room.findOneAndDelete({ _id: id })
    }

    //GET SINGLE ROOM
    async getRoom(id) {
        const singleRoom = await this._Room.findById(id)
        return singleRoom
    }
}

module.exports = new Room()