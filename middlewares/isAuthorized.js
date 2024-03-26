const User = require("../controllers/user.controller")

async function isAuthorized(req, res, next) {
    const id = req.userId
    const user = await User.fetchUser(id)
    const isAdmin = user.role === "admin"
    if (!isAdmin) throw new Error(`Not Authorized.`)
    next()
}

module.exports = isAuthorized