const { createToken } = require("../utils/token");
const User = require("../database/models/User");
const Role = require("../database/models/Role");
const SmsCode = require("../database/models/SmsCode");
const { SendVerifyCodeSms } = require("../utils/sms");
const bcrypt = require('bcryptjs');
const { mlogInStepOne, mRegister, registerPure, updateRegisterPure } = require('../messages/response.json');

exports.logInStepOne = async (req, res, next) => {
    try {
        await User.logInStepOneValidation(req.body);
        const { userName } = await req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            throw { message: mlogInStepOne.fail_1, statusCode: 404 };
        }
        const { result, code } = await SmsCode.createVerifyCode(user._id);
        const sms = await SendVerifyCodeSms(userName, code);
        console.log(userName, code);

        if (sms.data.status != 1) {
            throw { message: mlogInStepOne.fail_2, statusCode: 422 };
        }
        res.json({ message: mlogInStepOne.ok });
    } catch (err) {
        res.status(err.statusCode || 422).json(err);
    }

}

// exports.register = async (req, res, next) => {
//     try {
//         await User.registerValidation(req.body);
//         const { userName, passWord, role_id } = await req.body;
//         let user = await User.findOne({ userName });
//         if (user) {
//             const error = new Error();
//             error.message = { message: mRegister.fail_1 };
//             error.statusCode = 422;
//             throw error;
//         }
//         let Role = await Role.findOne({ _id: role_id });
//         if (!Role) {
//             const error = new Error();
//             error.message = { message: mRegister.fail_2 };
//             error.statusCode = 422;
//             throw error;
//         }
//         const token = await createToken(userName);

//         const result = await User.create({
//             token_id: token._id,
//             userName,
//             passWord: await bcrypt.hash(passWord, 10),
//             role_id
//         });
//         res.json(result);
//     } catch (err) {
//         res.status(err.statusCode || 422).json(err.message);
//     }
// }

exports.registerPure = async (req, res, next) => {
    try {
        const { userName, role_id, data } = await req.body;
        let user = await User.findOne({ userName });
        if (user) {
            throw { message: registerPure.fail_1, statusCode: 422 };
        }
        let role = await Role.findOne({ _id: role_id });
        if (!role) {
            throw { message: registerPure.fail_2, statusCode: 422 };
        }
        await User.create({
            userName,
            role_id,
            data
        });
        res.json({ message: registerPure.ok });
    } catch (err) {
        res.status(err.statusCode || 422).json(err);
    }
}

exports.userList = async (req, res, next) => {
    try {
        const { page, perPage } = req.body;
        let users = await User.find({}).populate('role_id', '-permissions').skip((page - 1) * perPage).limit(perPage).lean();
        const usersCount = await User.countDocuments({});
        res.send({ usersCount, users });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}


exports.updateRegisterPure = async (req, res, next) => {
    try {
        const { user_id, userName, role_id, data } = await req.body;
        let user = await User.findOne({ _id: user_id });
        if (!user) {
            throw { message: updateRegisterPure.fail_1, statusCode: 422 };
        }
        let newUserName = await User.findOne({ userName, _id: { $ne: user_id } });
        if (newUserName) {
            throw { message: updateRegisterPure.fail_2, statusCode: 422 };
        }
        let role = await Role.findOne({ _id: role_id });
        if (!role) {
            throw { message: updateRegisterPure.fail_3, statusCode: 422 };
        }
        await User.updateOne({ _id: user_id }, {
            userName,
            role_id,
            data
        });
        res.json({ message: updateRegisterPure.ok });
    } catch (err) {
        res.status(err.statusCode || 422).json(err);
    }
}