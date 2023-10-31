const mongoose = require("mongoose");


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
    visibel: {
        type: Boolean,
        default: 0,
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