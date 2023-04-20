import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    body: {
        type: String,
        maxLength: 1000
    }
}, { timestamps: true })

export default mongoose.model('comments', commentsSchema);