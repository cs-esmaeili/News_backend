const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');

module.exports = mongoose.model("Password", schemaMaker(
    {
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: function () {
                return !this.user_id; 
            }
        },
        user_id: {
            type: String,
            required: function () {
                return !this.username; 
            }
        },
        use: {
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
), 'Password');