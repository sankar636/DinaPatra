import mongoose from "mongoose";
const { Schema } = mongoose;

const dailyStorySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    story: {
        type: String,
        required: true,
        maxlength: 5000
    },
    quote: {
        type: String,
        trim: true,
        maxlength: 300
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    image: {
        type: String, // Store Cloudinary URL or file path
        required: true
    },
    visitedDate: {
        type: Date,
        required: true  // Used to mark which day this story belongs to
    }
}, {timestamps: true});

const DailyStory = mongoose.model('DailyStory', dailyStorySchema);

export default DailyStory;
