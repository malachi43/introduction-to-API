require("dotenv").config()
const userModel = require("../models/user.model")
const { sign } = require("jsonwebtoken")

class User {
    constructor() {
        this._User = userModel
    }

    //register a user.
    async registerUser({ username, password, email }) {
        const existingUser = await this._User.findOne({ email })

        if (existingUser) throw new Error(`user already exists.`)

        const hashedPassword = await this._User.hashPassword(password)
        const newUser = await new this._User({ username, email, password: hashedPassword }).save()
        return { email: newUser.email, username: newUser.username }

    }

    //login a user
    async loginUser({ email, password }) {
        //check if user is available in our platform
        const existingUser = await this._User.findOne({ email })

        if (!existingUser) throw new Error(`no user with existing details found.`)

        const isPasswordValid = await existingUser.comparePassword(password)

        if (!isPasswordValid) throw new Error(`invalid credentials.`)

        const token = sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        return { success: true, token, username: existingUser.username, email: existingUser.email }
    }

    //fetch a single user
    async fetchUser(id) {
        const user = await this._User.findById(id)
        return user
    }
}

module.exports = new User()