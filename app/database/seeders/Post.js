const PermissionGp = require('../models/PermissionGp');
const Category = require('../models/Category');
const User = require('../models/User');
const Post = require('../models/Post');
const { green, red } = require('colors');


const seqNumber = 5;
const seed = async (app) => {
    const gp = (await PermissionGp.find({}))[0];
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
            body: [{ text: "Consectetur excepteur ex aliquip dolor dolor ex pariatur Lorem sit et Lorem officia consectetur. Adipisicing fugiat laborum sunt minim aliquip ea irure nisi deserunt ut. Nisi tempor ea cillum ut nostrud id id aute. Dolore est nisi amet nostrud non fugiat aliquip ipsum nulla consectetur. Amet reprehenderit occaecat veniam dolor aliqua adipisicing. Elit ipsum anim labore ipsum velit in elit non ex nulla non veniam incididunt ex." },
            { videoUrl: "test" }]
        });
    }
    await console.log(`${red(seqNumber)} : ${green('Permission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}