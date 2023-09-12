const mongoose = require('mongoose');
const Post = require('../../database/models/Post');
const { mCreatePost, mDeletePost } = require('../../../messages.json');

exports.createPost = async (req, res, next) => {
    try {
        const { title, disc, category_id, permissionGp_id, body, auther } = req.body;

        const result = await Post.create({
            title,
            disc,
            category_id: new mongoose.Types.ObjectId(category_id),
            permissionGp_id: new mongoose.Types.ObjectId(permissionGp_id),
            body,
            views: 0,
            auther,
        });

        if (result) {
            res.send({ status: "ok", message: mCreatePost.ok });
        } else {
            res.send({ status: "fail", message: mCreatePost.fail });
        }

    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
exports.deletePost = async (req, res, next) => {
    try {
        const { post_id } = req.body;

        const deletedResult = await Post.deleteOne({ _id: post_id });
        if (deletedResult.deletedCount == 0) {
            const error = new Error();
            error.message = "post_id for delete notFound !";
            throw error;
        }
        res.send({ status: "ok", message: mDeletePost.ok });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}