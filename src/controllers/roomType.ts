import roomTypeModel from "../models/room-type.js"

class RoomType {
    #_RoomType: any
    constructor() {
        this.#_RoomType = roomTypeModel
    }

    //CREATE ROOM-TYPE
    async createRoomType({ name }) {
        const newRoomType = new this.#_RoomType({ name })
        return await newRoomType.save()
    }

    //GET ALL ROOMS
    async getAllRoomTypes() {
        const rooms = await this.#_RoomType.find()
        return rooms
    }
}

export default new RoomType()