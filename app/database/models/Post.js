const mongoose = require("mongoose");
const { utcToMiladi } = require("../../utils/TimeConverter");


const BlockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Image', 'Text', 'Video'],
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                if (this.type === 'Image') {
                    return (
                        typeof value === 'object' &&
                        value.hasOwnProperty('url') &&
                        value.hasOwnProperty('blurHash')
                    );
                } else if (this.type === 'Text') {
                    return typeof value === 'string';
                } else if (this.type === 'Video') {
                    return typeof value === 'object' && value.hasOwnProperty('url');
                }
                return false;
            },
            message: 'Invalid content for the ${this.type}',
        },
    },
});

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        thumbnail_image_h: {
            url: String,
            blurHash: String
        },
        thumbnail_image_v: {
            url: String,
            blurHash: String
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
        body: [BlockSchema],
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