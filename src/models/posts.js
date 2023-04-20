import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        minLength: 2,
        maxLenght: 100
    },
    body: {
        type: String,
        minLength: 2
    }
}, { timestamps: true })

export default mongoose.model('posts', postSchema);