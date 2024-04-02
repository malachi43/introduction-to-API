import mongoose from "mongoose"

async function connectDatabase(url:string) {
    const conn = await mongoose.connect(url)
    console.log(`database connected`)
    return conn
}

export default connectDatabase