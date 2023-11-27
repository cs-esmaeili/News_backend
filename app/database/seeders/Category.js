const Category = require('../models/Category');
const { green, red } = require('colors');


const seqNumber = 4;
const seed = async (app) => {
    for (let i = 0; i < 5; i++) {
        await Category.create({ name: "category " + i, "image": "/" });
    }
    await console.log(`${red(seqNumber)} : ${green('Permission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}