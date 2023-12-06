const mongoose = require("mongoose");


const permissionSchema = new mongoose.Schema({
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
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Permission", permissionSchema, 'permission');