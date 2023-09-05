const Category = require('../../database/models/Category');
const { mCreateCategory } = require('../../../messages.json');

exports.createCategory = async (req, res, next) => {
    try {
        console.log(mCreateCategory.ok);
        // const { name } = req.body;

        // const result = await Category.create({ name });
        // if (result) {
        //     res.send({ status: "ok"});

        // }

    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}
