const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            max: 255,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Token", schema, 'Token');