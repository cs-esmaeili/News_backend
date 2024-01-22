const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            url: String,
            blurHash: String
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Category", schema, 'Category');