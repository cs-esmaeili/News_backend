const Post = require('../database/models/Post');
const { createToken } = require('../utils/token');
exports.postList = async (req, res, next) => {
    try {
        const { page, perPage } = req.body;
        // const posts = await Post.find({}).skip((page - 1) * perPage).limit(perPage);
        // res.send({ status: "ok", posts });
        console.log(await createToken("javad", page));
        res.send({ status: "ok" });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
