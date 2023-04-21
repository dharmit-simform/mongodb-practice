import mongoose from "mongoose";

const addressSchema = {
    street: {
        type: String
    },
    suite: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    },
    geo: {
        type: mongoose.Schema.Types.Mixed
    }
}

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    username: {
        type: String,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    password: {
        type: String
    },
    address: {
        type: addressSchema
    },
    phone: {
        type: String,
    },
    website: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('user', userSchema);