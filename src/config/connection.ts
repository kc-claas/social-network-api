import mongoose from "mongoose";


const db = async () => {
try {await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB')
    console.log("Connected to database")
    return mongoose.connection
} catch (error) {
    console.error('Unable to connect to database', error)
    throw new Error('Database connection error')
}
}

export default db