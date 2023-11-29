const { transaction } = require('../database');
const Category = require('../database/models/Category');
const Post = require('../database/models/Post');
const { mCreateCategory, mDeleteCategory, mUpdateCategory } = require('../../messages.json');

exports.createCategory = async (req, res, next) => {
    try {
        const { name, image } = req.body;
        const result = await Category.create({ name, image });
        if (result) {
            res.send({ message: mCreateCategory.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mCreateCategory.fail };
        error.statusCode = 401;
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}

exports.categoryList = async (req, res, next) => {
    try {
        const { page, perPage } = req.body;
        const categorys = await Category.find({}).select('_id name updatedAt').skip((page - 1) * perPage).limit(perPage);
        const categorysCount = await Category.countDocuments({});
        res.send({ categorysCount, categorys });
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}

exports.deleteCategory = async (req, res, next) => {
    const { category_id, newCategory_id } = req.body;
    try {
        const deletedResult = await Category.deleteOne({ _id: category_id });
        if (deletedResult.deletedCount == 0) {
            const error = new Error();
            error.message = "category_id for delete notFound !";
            throw error;
        }
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
    if (newCategory_id != null && newCategory_id != "") {
        await Post.updateMany({ category_id }, { category_id: newCategory_id });
    }
    res.send({ message: mDeleteCategory.ok });

}

exports.updateCategory = async (req, res, next) => {
    try {
        const { category_id, name } = req.body;
        const updateResult = await Category.updateOne({ _id: category_id }, { name });
        if (updateResult.modifiedCount == 1) {
            res.send({ status: "ok", message: mUpdateCategory.ok });
            return;
        }
        const error = new Error();
        error.message = { message: mUpdateCategory.fail };
        throw error;
    } catch (err) {
        res.status(err.statusCode || 422).json(err.message);
    }
}
