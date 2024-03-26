const express = require("express")
const router = express.Router()
const User = require("../controllers/user.controller")
const asyncWrapper = require("../utils/asyncWrapper")

router.post("/register", asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body
    const createdUser = await User.registerUser({ username, password, email })
    console.log(`createdUser: `, createdUser)
    res.status(201).json({ success: true, data: createdUser })
}))

router.post("/login", asyncWrapper(async (req, res) => {
    const { email, password } = req.body
    const user = await User.loginUser({ email, password })
    res.status(200).json(user)
}))

module.exports = router
