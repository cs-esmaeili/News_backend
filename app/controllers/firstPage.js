const FirtPage = require('../database/models/FirtPage');
const { mData } = require('../messages/response.json');


exports.categorys = async (req, res, next) => {
    const chosenCategorys = await FirtPage.findOne({ location: 1 });

    if (chosenCategorys) {
        res.send(chosenCategorys.data);
    } else {
        res.status(422).json({ message: mData.fail });
    }
}