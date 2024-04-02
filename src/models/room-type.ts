import { Schema, model } from "mongoose";

const roomType = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required"],
    },
  },
  { timestamps: true }
);
const Room_Type = model("room-type", roomType);
export default Room_Type;
