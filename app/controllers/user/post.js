const Post = require('../../database/models/Post');

exports.postList = async (req, res, next) => {
    try {
        const { page, perPage } = req.body;
        const posts = await Post.find({}).skip((page - 1) * perPage).limit(perPage);
        res.send({ status: "ok", posts });
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
