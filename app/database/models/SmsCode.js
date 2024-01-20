const mongoose = require("mongoose");
const { schemaMaker } = require('./baseSchema');
const bcrypt = require('bcryptjs');
const { checkDelayTime } = require('../../utils/checkTime');
const { createVerifyCode } = require('../../messages/response.json');

const smsCodeschema = schemaMaker(
    {
        user_id: {
            type: mongoose.ObjectId,
            required: true,
            unique: true,
            ref: 'User',
        },
        code: {
            type: String,
            required: true,
            max: 255,
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
);

smsCodeschema.statics.createVerifyCode = async function (user_id) {
    try {
        const smsCode = await this.findOne({ user_id });
        if (smsCode) {
            const checkTime = checkDelayTime(smsCode.createdAt, process.env.SMS_RESEND_DELAY, false);
            if (!checkTime) {
                throw { message: createVerifyCode.fail, statusCode: 404 };
            }
        }
        const min = 1000;
        const max = 9999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min + "";
        const hashRandomNumber = await bcrypt.hash(randomNumber, 10);

        const result = await this.findOneAndUpdate({ user_id }, { user_id, code: hashRandomNumber }, { upsert: true, new: true, setDefaultsOnInsert: true });
        return { result, code: randomNumber };
    } catch (error) {
        throw error
    }
};

module.exports = mongoose.model("SmsCode", smsCodeschema, 'SmsCode');
