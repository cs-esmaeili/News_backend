const { createToken } = require("../../utils/token");
const User = require("../../database/models/User");
const { checkConnection } = require("../../../config/database");
const PermissionGp = require("../../database/models/PermissionGp");
const bcrypt = require('bcryptjs');
const { mlogIn, mRegister } = require('../../../messages.json');

exports.logIn = async (req, res, next) => {
    try {
        checkConnection();
        await User.logInValidation(req.body);
        const { userName, passWord } = await req.body;
        const user = await User.findOne({ userName });
        const check = await bcrypt.compare(passWord, user.passWord);
        if (!user || !check) {
            const error = new Error();
            error.message = { status: "fail", message: mlogIn.fail_1 };
            error.statusCode = 422;
            throw error;
        }
        const { token } = await createToken(userName, user.token_id);
        if (token == false) {
            const error = new Error();
            error.message = { status: "fail", message: mlogIn.fail_2 };
            error.statusCode = 500;
            throw error;
        }
        res.send({ status: "ok", token });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }

}

exports.register = async (req, res, next) => {
    try {
        await User.registerValidation(req.body);
        const { userName, passWord, permissionGp_id } = await req.body;
        let user = await User.findOne({ userName });
        if (user) {
            const error = new Error();
            error.message = mRegister.fail_1;
            error.statusCode = 422;
            throw error;
        }
        let permissionGp = await PermissionGp.findOne({ _id: permissionGp_id });
        if (!permissionGp) {
            const error = new Error();
            error.message = mRegister.fail_2;
            error.statusCode = 422;
            throw error;
        }
        const token = await createToken(userName);

        const result = await User.create({
            token_id: token._id,
            userName,
            passWord: await bcrypt.hash(passWord, 10),
            permissionGp_id
        });
        res.json(result);
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}