const Category = require('../../database/models/Category');
const { mCreateCategory } = require('../../../messages.json');

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await Category.create({ name });
        if (result) {
            res.send({ status: "ok", message: mCreateCategory.ok });
        } else {
            res.send({ status: "fail", message: mCreateCategory.fail });
        }
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
