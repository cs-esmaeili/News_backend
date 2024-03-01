const mongoose = require("mongoose");
const { utcToMiladi } = require("../../utils/TimeConverter");

const schema = new mongoose.Schema(
    {
        location: {
            type: Number,
            required: true,
            unique: true,
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
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
module.exports = mongoose.model("FirtPage", schema, 'FirtPage');