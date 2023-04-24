import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    genre: {
        type: String
    },
    title: {
        type: String,
        minLength: 2,
        maxLenght: 100
    },
    body: {
        type: String,
        minLength: 2
    },
    likes: {
        type: mongoose.Schema.Types.Mixed,
        default: []
    }
}, { timestamps: true })

export default mongoose.model('posts', postSchema);