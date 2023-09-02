const mongoose = require("mongoose");



const bodySchema = new mongoose.Schema({
    video_url: {
        type: String,
        trim: true,
    },
    image_url: {
        type: String,
        trim: true,
    },
    text: {
        type: String,
        trim: true,
    },
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    disc: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    permissionGp_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    body: [{}],
    views: {
        type: Number,
        default: 0,
        required: true,
    },
    auther: {
        type: mongoose.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema, 'post');