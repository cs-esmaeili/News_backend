const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.ObjectId,
            required: true,
            unique: true,
            ref: 'User',
        },
        code: {
            type: String,
            required: true,
            max: 255,
        },
    },
    {
        timestamps: true
    }
);



module.exports = mongoose.model("VerifyCode", schema, 'VerifyCode');
