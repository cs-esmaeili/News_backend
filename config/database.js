const mongoose = require('mongoose');

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const host = encodeURIComponent(process.env.HOST);
const port = encodeURIComponent(process.env.DATABASE_PORT);
const database = encodeURIComponent(process.env.DB_DATABASE);

const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin&authMechanism=DEFAULT`;

const connectDB = async () => {
    try {
        const result = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected To Database');
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    connectDB,
    uri
};