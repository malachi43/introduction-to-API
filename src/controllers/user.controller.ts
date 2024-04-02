import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/user.model.js";
import pkg from "jsonwebtoken";
const { sign } = pkg

type Register = {
  username: string;
  password: string;
  email: string;
};

type Login = {
  email: string;
  password: string;
};

class User {
  #_User: any;
  constructor() {
    this.#_User = userModel;
  }

  //register a user.
  async registerUser({ username, password, email }: Register) {
    const existingUser = await this.#_User.findOne({ email });

    if (existingUser) throw new Error(`user already exists.`);

    const newUser = await new this.#_User({ username, email, password }).save();
    return { email: newUser.email, username: newUser.username };
  }

  //login a user
  async loginUser({ email, password }: Login) {
    //check if user is available in our platform
    const existingUser = await this.#_User.findOne({ email });

    if (!existingUser) throw new Error(`no user with existing details found.`);

    const isPasswordValid = await existingUser.comparePassword(password);

    if (!isPasswordValid) throw new Error(`invalid credentials.`);

    const token = sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      success: true,
      token,
      username: existingUser.username,
      email: existingUser.email,
    };
  }

  //fetch a single user
  async fetchUser(id: string) {
    const user = await this.#_User.findById(id);
    return user;
  }
}

export default new User();
