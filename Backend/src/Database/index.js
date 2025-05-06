import mongoose from 'mongoose';

const DB_NAME = 'DinaPatra';

const connectDB = async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
       console.log("Connecting to MongoDB at:", `${process.env.MONGODB_URI}${DB_NAME}`);
    } catch (error) {
        console.log("MongoDB connection failure");
        process.exit(1);
    }
};

export default connectDB;
