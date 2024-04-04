const FirtPage = require('../database/models/FirtPage');
const { mData } = require('../messages/response.json');




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