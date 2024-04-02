import { model, Schema } from "mongoose";
import pkg from "bcryptjs";
const { hash, genSalt, compare } = pkg

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username field is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "email field is required"],
  },
  password: {
    type: String,
    required: [true, "password field is required"],
  },
  role: {
    type: String,
    enum: ["admin", "guest"],
    default: "guest",
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const saltRound = 12;
    const salt = await genSalt(saltRound);
    this.password = await hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  console.log(`this.password`, this);
  return await compare(userPassword, this.password);
};
const User = model("user", userSchema);

export default User;
