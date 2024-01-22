const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

const verifyCodeSchema = schemaMaker(
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
    }
);


module.exports = mongoose.model("VerifyCode", verifyCodeSchema, 'VerifyCode');
