import mongoose, { Schema } from "mongoose";


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
},{timestamps: true})



export const Blog = mongoose.model("Blog", blogSchema)