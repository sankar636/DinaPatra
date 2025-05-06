import mongoose, { mongo } from 'mongoose'


const DB_NAME='DinaPatra'


const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("MongoDB connection failure");
        process.exit(1)        
    }
}

export default connectDB