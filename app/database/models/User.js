const { logInStepOneSchema } = require("../../validations/admin/logIn");
const { registerSchema } = require("../../validations/admin/register");
const mongoose = require("mongoose");


const schema = new mongoose.Schema(
    {
        token_id: {
            type: mongoose.ObjectId,
            ref: 'Token',
        },
        role_id: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'Role',
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            max: 11,
            min: 11,
        },
        data: {
            image: {
                url: String,
                blurHash: String
            },
            fullName: String,
            nationalCode: String,
            birthday: mongoose.Schema.Types.Mixed,
            shebaNumber: String,
        },
    },
    {
        timestamps: true
    }
);

schema.statics.logInStepOneValidation = function (body) {
    return logInStepOneSchema.validate(body, { abortEarly: false });
};
schema.statics.registerValidation = function (body) {
    return registerSchema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("User", schema, 'User');