const { createToken } = require("../../utils/token");
const { hashData } = require("../../utils/hashData");
const User = require("../../database/models/User");
const PermissionGp = require("../../database/models/PermissionGp");

exports.logIn = async (req, res, next) => {
    try {
        await User.logInValidation(req.body);
        const { userName, passWord } = await req.body;
        const user = await User.findOne({ userName, passWord });
        if (!user) {
            const error = new Error();
            error.message = { status: "fail", message: "نام کاربری یا رمز عبور نادرست می باشد" };
            error.statusCode = 422;
            throw error;
        }
        const { token } = await createToken(userName, user.token_id);
        if (token == false) {
            const error = new Error();
            error.message = { status: "fail", message: "مشکلی در وارد شدن به وجود آمد دوباره تلاش کنید" };
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
            error.message = "حساب کاربری وجود دارد";
            error.statusCode = 422;
            throw error;
        }
        let permissionGp = await PermissionGp.findOne({ _id: permissionGp_id });
        if (!permissionGp) {
            const error = new Error();
            error.message = "گروه دسترسی وجود ندارد";
            error.statusCode = 422;
            throw error;
        }
        const token = await createToken(userName);

        const result = await User.create({
            token_id: token._id,
            userName,
            passWord: await hashData(passWord),
            permissionGp_id
        });
        res.json(result);
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}