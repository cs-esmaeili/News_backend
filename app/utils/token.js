const Token = require('../database/models/Token');
const bcrypt = require('bcryptjs');
exports.createToken = async (unicData, token_id = null, time = null) => {
    try {
        var salt = await bcrypt.genSaltSync(10);
        const min = 1;
        const max = 1000;
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        let text = unicData + randomInt;
        if (time == null) {
            text += await new Date();
        }
        let token = await bcrypt.hash(text, salt);
        let result = await Token.find({ _id: token_id });
        if (result.length > 0) {
            result = await Token.updateOne({ _id: token_id }, { token });
            result = await Token.find({ _id: token_id });
            result = result[0];
        } else {
            result = await Token.create({ token });
        }
        return result;
    } catch (error) {
        console.error('Error updating or creating document:', error);
    }
}