const expressListEndpoints = require('express-list-endpoints');
const PermissionGp = require('../models/PermissionGp');
const Permission = require('../models/Permission');
const { green, red } = require('colors');


const seqNumber = 2;
const seed = async (app) => {
    const availableRoutes = expressListEndpoints(app);
    const gps = await PermissionGp.find({});
    for (const key in gps) {
        const gp = gps[key];
        for (const key in availableRoutes) {
            const path = availableRoutes[key].path;
            await Permission.create({ name: 'SomeRoute', url_route: path, permissionGp_id: gp._id });
        }
    }

    await console.log(`${red(seqNumber)} : ${green('Permission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}