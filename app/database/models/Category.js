const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

module.exports = mongoose.model("Category", schemaMaker(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
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
), 'Category');