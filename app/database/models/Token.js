const mongoose = require("mongoose");
const { utcToMiladi } = require("../../utils/TimeConverter");
const schema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            max: 255,
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

module.exports = mongoose.model("Token", schema, 'Token');