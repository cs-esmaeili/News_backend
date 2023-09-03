const { logInschema } = require("../../validations/logIn");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    token_id: {
        type: mongoose.ObjectId
    },
    userName: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        max: 50,
        min: 4,
        required: true,
        trim: true,
    },
    permissionGp_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    data: {
        card_number: String,
        national_code: String,
        birthday: Date,
        full_name: String,
        sheba_number: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.statics.logInValidation = function (body) {
    return logInschema.validate(body, { abortEarly: false });
};


module.exports = mongoose.model("User", userSchema, 'user');