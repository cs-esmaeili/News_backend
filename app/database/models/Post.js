const mongoose = require("mongoose");
const { utcToMiladi } = require("../../utils/TimeConverter");
const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        disc: {
            type: String,
            required: true,
        },
        metaTags: {
            type: Array,
            required: true,
        },
        category_id: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'Category',
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
            type: mongoose.Schema.Types.Mixed,
            default: utcToMiladi(new Date()),
        },
        updatedAt: {
            type: mongoose.Schema.Types.Mixed,
            set: function () {
                return utcToMiladi(new Date());
            },
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Post", schema, 'Post');