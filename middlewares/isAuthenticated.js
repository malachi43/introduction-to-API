require("dotenv").config()
const jwt = require("jsonwebtoken")

async function isAuthenticated(req, res, next) {
    const bearerToken = req.headers['authorization']
    if (!bearerToken) throw new Error(`please provide an authentication token.`)
    const token = bearerToken.split(" ")[1]
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = verifiedToken.id
    next()
}

module.exports = isAuthenticated