const { logInSchema } = require("../../validations/admin/logIn");
const { registerSchema } = require("../../validations/admin/register");
const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');


const userSchema = schemaMaker(
    {
        token_id: {
            type: mongoose.ObjectId
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            max: 11,
            min: 11,
        },
        role_id: {
            type: mongoose.ObjectId,
            required: true,
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
        createdAt: {
            type: mongoose.Schema.Types.Mixed,
            default: Date.now,
        },
        updatedAt: {
            type: mongoose.Schema.Types.Mixed,
            default: Date.now,
        },
    }
);
userSchema.statics.logInValidation = function (body) {
    return logInSchema.validate(body, { abortEarly: false });
};
userSchema.statics.registerValidation = function (body) {
    return registerSchema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("User", userSchema, 'User');