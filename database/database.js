const mongoose = require("mongoose")

async function connectDatabase(url) {
    const conn = await mongoose.connect(url)
    console.log(`database connected`)
    return conn
}

module.exports = connectDatabase