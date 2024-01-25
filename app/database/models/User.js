const { createToken } = require("../../utils/token");
const Role = require("./Role");
const { utcToMiladi } = require("../../utils/TimeConverter");
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

schema.statics.createNormalUser = async function (userName) {
    const role = await Role.findOne({ name: "user" });
    const { _id, token } = await createToken(userName);
    const user = await this.create({ token_id: _id, role_id: role._id, userName });
    return user;
};

module.exports = mongoose.model("User", schema, 'User');