const User = require('../models/User');
const PermissionGp = require('../models/PermissionGp');
const { green, red } = require('colors');


const seqNumber = 3;
const seed = async (app) => {
    const permissionGp = await PermissionGp.find({ name: "MainPermissionGp" });
    await User.create({
        userName: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        permissionGp_id: permissionGp[0]._id
    });
    await console.log(`${red(seqNumber)} : ${green('User seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}