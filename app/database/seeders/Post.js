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

    for (let i = 0; i < 10; i++) {
        const category = categorys[(Math.floor(Math.random() * categorys.length))];
        await Post.create({
            title: 'Some post ' + i,
            disc: "Velit et velit exercitation deserunt duis ut culpa incididunt excepteur aute.",
            category_id: category._id,
            permissionGp_id: gp._id,
            views: i,
            auther: user._id,
            body: [
                [{ type: "text", content: "this is text 1" }, { type: "text", content: "this is text 2" }],
                [{ type: "text", content: "this is text 3" }, { type: "text", content: "this is text 4" }],
                [{ type: "text", content: "this is text 5" }]
            ]
        });
    }
    await console.log(`${red(seqNumber)} : ${green('Permission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}