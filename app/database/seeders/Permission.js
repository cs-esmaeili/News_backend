const expressListEndpoints = require('express-list-endpoints');
const Permission = require('../models/Permission');
const { green, red } = require('colors');


const seqNumber = 1;
const seed = async (app) => {
    const availableRoutes = expressListEndpoints(app);
    for (const key in availableRoutes) {
        const path = availableRoutes[key].path;
        await Permission.create({ name: path, route: path, disc: "disc" });
    }

    await console.log(`${red(seqNumber)} : ${green('Permission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}