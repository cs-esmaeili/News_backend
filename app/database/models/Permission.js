const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        disc: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Permission", schema, 'Permission');