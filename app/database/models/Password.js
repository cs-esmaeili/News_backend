const mongoose = require("mongoose");

const schema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Password", schema, 'Password');