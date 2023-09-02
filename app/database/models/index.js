const colors = require('colors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const models = [];

const migration = async () => {
  if (process.env.NODE_ENV === "development" && process.argv.includes('db')) {
    await mongoose.connection.db.dropDatabase(function (err, result) {
      if (result) {
        console.log(colors.red(`database deleted`));
      } else {
        console.log(err);
      }
    });
  }
  await fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file));
      models.push(model);
    });
  if (process.env.NODE_ENV === "development" && process.argv.includes('data')) {
    models.map(async (value) => {
      await value.deleteMany({});
    });
    console.log(colors.red(`documents deleted`));
  }
}


module.exports = migration;