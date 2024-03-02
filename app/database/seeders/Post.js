const Role = require('../models/Role');
const Category = require('../models/Category');
const User = require('../models/User');
const Post = require('../models/Post');
const { green, red } = require('colors');


const seqNumber = 5;
const seed = async (app) => {
    const gp = (await Role.find({}))[0];
    const categorys = await Category.find({});
    const user = (await User.find({}))[0];

    for (let i = 0; i < 90; i++) {
        const category = categorys[(Math.floor(Math.random() * categorys.length))];
        await Post.create({
            title: 'Some post ' + i,
            disc: "Velit et velit exercitation deserunt duis ut culpa incididunt excepteur aute.",
            category_id: category._id,
            views: i,
            auther: user._id,
            metaTags: ['haha', "kda"],
            body: (i % 2 == 0) ? [
                [{ type: "Image", content: { url: "http://localhost:3000/storage/1.jpg" } }],
                [{ type: "Text", content: "this is Text 3" }, { type: "Text", content: "this is Text 4" }],
                [{ type: "Text", content: "this is Text 5" }]
            ] :
                [
                    [{ type: "Image", content: { url: "http://localhost:3000/storage/2.png" } }],
                    [{ type: "Text", content: "this is Text 3" }, { type: "Text", content: "this is Text 4" }],
                    [{ type: "Text", content: "this is Text 5" }]
                ]
        });
    }
    await console.log(`${red(seqNumber)} : ${green('Posts seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}