const Token = require('../database/models/Token');
const bcrypt = require('bcryptjs');
exports.createToken = async (unicData, token_id = null) => {
    try {
        const hash = await bcrypt.hash(unicData, 10);
        let result = await Token.find({ _id: token_id });
        if (result.length > 0) {
            result = await Token.updateOne({ _id: token_id }, { token: hash });
            result = await Token.find({ _id: token_id });
            result = result[0];
        } else {
            result = await Token.create({ token: hash });
        }
        return result;
    } catch (error) {
        console.error('Error updating or creating document:', error);
        return false;
    }
}