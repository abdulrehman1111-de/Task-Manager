import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        unique: true,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "role": {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
        required: true
    },
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)
export default userModel