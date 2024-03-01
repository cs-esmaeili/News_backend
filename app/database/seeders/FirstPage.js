const FirtPage = require('../models/FirtPage');
const Category = require('../models/Category');
const { green, red } = require('colors');


const seqNumber = 6;
const seed = async (app) => {

    const categorys = await Category.find({});

    await FirtPage.create({
        location: 1,
        data: categorys
    });
    await console.log(`${red(seqNumber)} : ${green('FirtPage seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}