const { model, Schema } = require("mongoose")
const { hash, genSalt, compare } = require("bcryptjs")

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username field is required"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "email field is required"]
    },
    password: {
        type: String,
        required: [true, "password field is required"]
    },
    role: {
        type: String,
        enum: ["admin", "guest"],
        default: "guest"
    }
})

userSchema.statics.hashPassword = async function (userPassword) {
    const saltRound = 12
    const salt = await genSalt(saltRound)
    this.password = await hash(userPassword, salt)
    return this.password
}

userSchema.methods.comparePassword = async function (userPassword) {
    console.log(`this.password`, this)
    return await compare(userPassword, this.password)
}




module.exports = model("user", userSchema)