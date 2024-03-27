require("dotenv").config()
const jwt = require("jsonwebtoken")

async function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'].split(" ")[1]
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = verifiedToken.id
    next()
}

module.exports = isAuthenticated