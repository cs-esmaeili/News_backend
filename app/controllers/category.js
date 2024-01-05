const path = require('path');
const BaseFileDir = path.join(process.cwd(), ...JSON.parse(process.env.STORAGE_LOCATION));
const Category = require('../database/models/Category');
const { getLocalPathFromUrl } = require('../utils/file');
const Post = require('../database/models/Post');
const { getBase64 } = require('@plaiceholder/base64');
const { mCreateCategory, mDeleteCategory, mUpdateCategory } = require('../messages/response.json');

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
        let categorys = await Category.find({}).select('_id name image updatedAt').skip((page - 1) * perPage).limit(perPage).lean();
        for (let category of categorys) {
            const localPath = getLocalPathFromUrl(category.image);
            const hash = await getBase64(localPath);
            category.image = { url: category.image, blurHash: hash }
        }
        const categorysCount = await Category.countDocuments({});
        console.log(categorys);
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
        const { category_id, name, image } = req.body;
        const updateResult = await Category.updateOne({ _id: category_id }, { name, image });
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
