import { app } from './app.js';
import connectDB from './Database/index.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`MongoDB connected successfully on ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error);
    });
    
