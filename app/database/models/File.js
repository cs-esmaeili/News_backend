const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

module.exports = mongoose.model("File", schemaMaker(
    {
        person_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        location: {
            type: Array,
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
), 'File');