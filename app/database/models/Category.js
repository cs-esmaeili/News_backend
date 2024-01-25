const mongoose = require("mongoose");
const { utcToMiladi } = require("../../utils/TimeConverter");
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            url: String,
            blurHash: String
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
module.exports = mongoose.model("Category", schema, 'Category');