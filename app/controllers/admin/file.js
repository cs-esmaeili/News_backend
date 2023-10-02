const File = require("../../database/models/File");
const path = require('path');
const fs = require('fs');
const BaseFileDir = path.join(process.cwd(), process.env.STORAGE_LOCATION);
const { v4: uuidv4 } = require('uuid');
const { transaction } = require('../../database');
const { mSaveFile, mDeleteFile, deleteFolder } = require('../../../messages.json');

exports.saveFile = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const { location } = req.body;
    const fileList = req.files['files[]'];
    const result = await transaction(async () => {
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
    });
    if (result === true) {
        res.send({ message: mSaveFile.ok });
    } else {
        res.status(result.statusCode || 422).json({ message: mSaveFile.fail });
    }
}

exports.deleteFile = async (req, res, next) => {
    const { file_id } = req.body;
    const result = await transaction(async () => {
        const file = await File.findOne({ _id: file_id });
        if (!file) {
            const error = new Error();
            error.message = { message: mDeleteFile.fail };
            error.statusCode = 422;
            throw error;
        }
        const fileLocation = path.join(file.location, file.name);
        fs.unlinkSync(fileLocation, { recursive: true });
        await File.deleteOne({ _id: file_id });
    });
    if (res != null) {
        if (result === true) {
            console.log("12");
            res.send({ message: mDeleteFile.ok });
        } else {
            console.log("1");
            res.status(result.statusCode || 422).json({ message: mDeleteFile.fail });
        }
    } else {
        return (true);
    }
}

exports.deleteFolder = async (req, res, next) => {
    const { location } = req.body;
    try {
        const folderLocation = path.join(BaseFileDir, ...location);
        const files = fs.readdirSync(folderLocation, { recursive: true });
        const result = await File.find({ name: files });
        result.forEach(async (file) => {
            this.deleteFile({ body: { file_id: file._id } }, null, null);
        });
        fs.rmSync(folderLocation, { recursive: true });
        res.send({ message: deleteFolder.ok });
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: deleteFolder.fail });
    }

}