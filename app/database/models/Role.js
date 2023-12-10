const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

module.exports = mongoose.model("Role", schemaMaker(
    {
        name: {
            type: String,
            required: true,
        },
        permissions: {
            type: Array,
            required: true,
            ref: 'Permission',
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
), 'Role');