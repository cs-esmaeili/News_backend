const User = require('../models/User');
const Role = require('../models/Role');
const { createToken } = require('../../utils/token');
const { green, red } = require('colors');
const bcrypt = require('bcryptjs');

const seqNumber = 3;
const seed = async (app) => {
    const role = await Role.find({ name: "admin" });
    const result = await createToken(process.env.ADMIN_USERNAME);
    await User.create({
        token_id: result._id,
        userName: process.env.ADMIN_USERNAME,
        passWord: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        permissionGp_id: role[0]._id
    });
    await console.log(`${red(seqNumber)} : ${green('User seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}