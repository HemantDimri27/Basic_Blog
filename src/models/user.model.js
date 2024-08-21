import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    // fullname, username, email, password, blog
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    
})



export const User = mongoose.model("User", userSchema)