const mongoose = require("mongoose");
const { utcToMiladi } = require("../../utils/TimeConverter");

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
        },
        createdAt: {
            type: mongoose.Schema.Types.Mixed,
            default: utcToMiladi(new Date()),
        },
        updatedAt: {
            type: mongoose.Schema.Types.Mixed,
            default: utcToMiladi(new Date()),
            set: function () {
                return utcToMiladi(new Date());
            },
        },
    },
    {
        timestamps: true
    }
);

// schema.pre('updateOne', async function (next) {
//     const time = await utcToJalali(new Date());
//     console.log(time);
//     this._update.updatedAt_M = time;
//     next();
// });

module.exports = mongoose.model("Role", schema, 'Role');