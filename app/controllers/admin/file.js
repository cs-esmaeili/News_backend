const File = require("../../database/models/File");
const path = require('path');
const fs = require('fs');
const BaseFileDir = path.join(process.cwd(), process.env.STORAGE_LOCATION);
const { v4: uuidv4 } = require('uuid');
const { transaction } = require('../../database');
const { mSaveFile } = require('../../../messages.json');

exports.saveFile = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const { location } = req.body;
    const fileList = req.files['files[]'];
    await transaction(async () => {
        try {
            for (const fileKey in fileList) {
                const uploadedFile = fileList[fileKey];
                const saveFileLocation = path.join(BaseFileDir, ...JSON.parse(location));
                const newFileName = uuidv4() + path.extname(uploadedFile.name);
                await File.create({
                    person_id: req.body.user._id,
                    name: newFileName,
                    location: saveFileLocation,
                });
                fs.mkdirSync(saveFileLocation, { recursive: true });
                uploadedFile.mv(path.join(saveFileLocation, newFileName));
            }
        } catch (err) {
            res.status(err.statusCode || 422).json(err.errors || err.message);
        }
    });
    return res.send({ message: mSaveFile.ok });
}

exports.deleteFile = async (req, res, next) => {
    const { file_id } = req.body;

    const file = File.find({ _id: file_id });

}