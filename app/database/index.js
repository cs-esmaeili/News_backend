const { connectDB } = require('../../config/database');
const migration = require('./models/');
const seed = require('./seeders');

exports.connect = async (app) => {
    await connectDB();
    await migration();
    await seed(app);
}