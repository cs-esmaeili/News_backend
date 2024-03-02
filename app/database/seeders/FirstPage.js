const FirtPage = require('../models/FirtPage');
const Category = require('../models/Category');
const Post = require('../models/Post');
const { green, red } = require('colors');


const seqNumber = 6;
const seed = async (app) => {

    const categorys = await Category.find({});
    const posts = await Post.find({});

    await FirtPage.create({
        location: 1,
        data: categorys
    });

    await FirtPage.create({
        location: 2,
        data: posts
    });
    
    await FirtPage.create({
        location: 3,
        data: posts
    });
    
    await console.log(`${red(seqNumber)} : ${green('FirtPage seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}