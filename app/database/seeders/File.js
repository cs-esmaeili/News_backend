const File = require('../models/File');
const User = require('../models/User');
const { green, red } = require('colors');

const seqNumber = 6;
const seed = async (app) => {
    const user = (await User.find({}))[0];
    await File.create({
        person_id: user._id,
        name: "1.jpg",
        location: "/person/"
    });
    await console.log(`${red(seqNumber)} : ${green('File seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}