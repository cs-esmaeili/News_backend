const Post = require('../../database/models/Post');
exports.postList = async (req, res, next) => {
    try {
        const { page, perPage } = req.body;


        const posts = await Post.create({
            title,
            disc,
            category_id,
            permissionGp_id,
            body,
            views,
            auther,
        });


        res.send({ status: "ok", posts });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
