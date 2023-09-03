const { createToken, checkToken, checkTokenWhitOutTime } = require("../utils/token");
const User = require("../database/models/User");
const Token = require("../database/models/Token");

exports.login = async (req, res, next) => {
    try {
        await User.logInValidation(req.body);
        // const { email, password, phoneNumber } = await req.body;
        const { username, password } = await req.body;
        // console.log(username);
        const user = await User.findOne({ password, username });
        // const user = await User.findOne({ password, $or: [{ email }, { phoneNumber }] });
        if (!user) {
            const error = new Error();
            error.message = { status: "fail", message: "نام کاربری یا رمز عبور نادرست می باشد" };
            error.statusCode = 422;
            throw error;
        }
        const token = await createToken(JSON.parse(JSON.stringify(user)), "7d");
        const result = await Token.updateOne({ _id: user.token_id }, { token });
        if (!result.modifiedCount === 1) {
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