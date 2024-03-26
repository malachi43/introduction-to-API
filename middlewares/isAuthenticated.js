require("dotenv").config()
const jwt = require("jsonwebtoken")

function isAuthenticated(req, res, next) {
    const token = req.headers('authorization').split(" ")[1]
    console.log(`token: ${token}`)
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(verifiedToken)
    req.userId = verifiedToken.id
    console.log(req)
    next()
}

module.exports = isAuthenticated