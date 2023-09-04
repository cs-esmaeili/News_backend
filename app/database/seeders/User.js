const User = require('../models/User');
const PermissionGp = require('../models/PermissionGp');
const { createToken } = require('../../utils/token');
const { green, red } = require('colors');
const bcrypt = require('bcryptjs');

const seqNumber = 3;
const seed = async (app) => {
    const permissionGp = await PermissionGp.find({ name: "MainPermissionGp" });
    const result = await createToken(process.env.ADMIN_USERNAME);
    await User.create({
        token_id: result._id,
        userName: process.env.ADMIN_USERNAME,
        passWord: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        permissionGp_id: permissionGp[0]._id
    });
    await console.log(`${red(seqNumber)} : ${green('User seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}