const FirtPage = require('../database/models/FirtPage');
const { mData } = require('../messages/response.json');


exports.categorys = async (req, res, next) => {
    const chosenCategorys = await FirtPage.findOne({ location: 1 }).populate({
        path: 'data',
        model: 'Category',
    });;

    if (chosenCategorys) {
        res.send(chosenCategorys.data);
    } else {
        res.status(422).json({ message: mData.fail });
    }
}

exports.firstPage = async (req, res, next) => {
    const firstPageData = await FirtPage.find({ location: { $ne: 1 } }).populate({
        path: 'data',
        model: 'Post',
        populate: {
            path: 'category_id',
            model: 'Category',
            select: 'name'
        }
    });

    if (firstPageData) {
        res.send(firstPageData);
    } else {
        res.status(422).json({ message: mData.fail });
    }
}