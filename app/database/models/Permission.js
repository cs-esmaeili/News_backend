const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

module.exports = mongoose.model("Permission", schemaMaker(
    {
        name: {
            type: String,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        disc: {
            type: String,
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
), 'permission');