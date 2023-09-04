const bcrypt = require('bcryptjs');
exports.hashData = async (data) => {
    const min = 1;
    const max = 1000;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    const time = new Date();
    let text = data + randomInt + time;
    var salt = bcrypt.genSaltSync(10);
    let result = await bcrypt.hash(text, salt);
    return result;
}