import { Request } from "express";
import roomModel from "../models/room.js";
import { UpdateQuery } from "mongoose";
import TRoom from "../types/room.types.js";

class Room {
  #_Room: any;
  constructor() {
    this.#_Room = roomModel;
  }

  //CREATE A ROOM
  async createRoom({ name, roomType, price }): Promise<TRoom> {
    const newRoom = new this.#_Room({ name, roomType, price });
    return await newRoom.save();
  }

  //GET ALL ROOMS
  async getAllRooms(req: Request): Promise<TRoom[]> {
    const queryObj = {} as any;
    const { minPrice, maxPrice, roomType } = req.query;
    if (minPrice) {
      queryObj.minPrice = { $gte: Number(minPrice) };
    }
    if (maxPrice) {
      queryObj.maxPrice = { $eq: Number(maxPrice) };
      queryObj.minPrice = minPrice ? { $gte: Number(minPrice) } : { $gte: 0 };
    }
    if (roomType) {
      queryObj.roomType = roomType;
    }

    const rooms = await this.#_Room.find(queryObj);
    return rooms;
  }

  //EDIT ROOM
  async editRoom(id: string, dataObj: UpdateQuery<TRoom>): Promise<TRoom> {
    const editedRoom = await this.#_Room.findOneAndUpdate(
      { _id: id },
      dataObj,
      {
        new: true,
        runValidators: true,
      }
    );
    return editedRoom;
  }

  //DELETE A ROOM
  async deleteRoom(id: string) {
    const deletedRoom = await this.#_Room.findOneAndDelete({ _id: id });
  }

  //GET SINGLE ROOM
  async getRoom(id: string): Promise<TRoom> {
    const singleRoom = await this.#_Room.findById(id);
    return singleRoom;
  }
}

export default new Room();
