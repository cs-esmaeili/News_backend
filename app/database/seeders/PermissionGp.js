const PermissionGp = require('../models/PermissionGp');
const { green, red } = require('colors');

const seqNumber = 1;
const seed = async () => {
    await PermissionGp.create({ name: 'MainPermissionGp' });

    await console.log(`${red(seqNumber)} : ${green('PermissionGp seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}