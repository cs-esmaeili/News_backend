const { logInStepOneSchema } = require("../../validations/admin/logIn");
const { registerSchema } = require("../../validations/admin/register");
const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

const userSchema = schemaMaker(
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
    }
);
userSchema.statics.logInStepOneValidation = function (body) {
    return logInStepOneSchema.validate(body, { abortEarly: false });
};
userSchema.statics.registerValidation = function (body) {
    return registerSchema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("User", userSchema, 'User');