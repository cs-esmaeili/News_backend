const mongoose = require("mongoose");


const permissionGpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

module.exports = mongoose.model("PermissionGp", permissionGpSchema, 'permissionGp');