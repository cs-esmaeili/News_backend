const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        permissions: {
            type: Array,
            required: true,
            ref: 'Permission',
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Role", schema, 'Role');