const mongoose = require('mongoose');
const Post = require('../database/models/Post');
const { mCreatePost, mDeletePost, mUpdatePost } = require('../messages/response.json');
exports.createPost = async (req, res, next) => {
    try {
        const { title, disc, category_id, body, metaTags } = req.body;
        const result = await Post.create({
            title,
            disc,
            category_id: new mongoose.Types.ObjectId(category_id),
            body,
            views: 0,
            metaTags,
            auther: "656b50a17ea7d8a6e27f00e9",
            // auther: req.body.user._id,
        });
        if (result) {
            res.send({ message: mCreatePost.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mCreatePost.fail_1 };
        throw error;
    } catch (err) {
        if (err.code == 11000) {
            res.status(err.statusCode || 422).json({ message: mCreatePost.fail_2 });
        } else {
            res.status(err.statusCode || 422).json(err.message);
        }
    }
}
exports.deletePost = async (req, res, next) => {
    try {
        const { post_id } = req.body;
        const deletedResult = await Post.deleteOne({ _id: post_id });
        if (deletedResult.deletedCount == 0) {
            const error = new Error();
            error.message = { message: mDeletePost.fail };
            throw error;
        }
        res.send({ message: mDeletePost.ok });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}
exports.updatePost = async (req, res, next) => {
    try {
        const { post_id, title, disc, category_id, body, metaTags } = req.body;
        const updateResult = await Post.updateOne({ _id: post_id }, {
            title,
            disc,
            category_id: new mongoose.Types.ObjectId(category_id),
            body,
            metaTags,
        });
        if (updateResult.modifiedCount == 1) {
            res.send({ message: mUpdatePost.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mUpdatePost.fail };
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}


exports.postList = async (req, res, next) => {
    try {
        const { page, perPage } = req.body;
        const posts = await Post.find({}).populate('category_id').skip((page - 1) * perPage).limit(perPage).lean();;
        for (let post of posts) {
            post.categoryName = post.category_id.name;
        }
        const postsCount = await Post.countDocuments({});
        res.send({ postsCount, posts });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}

exports.postSerach = async (req, res, next) => {
    try {
        const { search, page, perPage } = req.body;
        let convertedSearch = search.toLowerCase().trim();
        const posts = await Post.find({ title: { $regex: convertedSearch, $options: 'i' } })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const total = await Post.countDocuments({ title: { $regex: convertedSearch, $options: 'i' } });


        res.send({ status: "ok", totalPosts: total, posts });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
