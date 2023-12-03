const File = require("../database/models/File");
const path = require('path');
const fs = require('fs');
const BaseFileDir = path.join(process.cwd(), ...JSON.parse(process.env.STORAGE_LOCATION));
const { v4: uuidv4 } = require('uuid');
const { transaction } = require('../database');
const { mSaveFile, mDeleteFile, mDeleteFolder, mFolderFileList, mCreateFolder, mRenameFolder, mRenameFile } = require('../../messages.json');
const { getFilesFromFolder } = require('../utils/file');

exports.saveFile = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { location } = req.body;
    const fileList = req.files['files[]'];
    const result = await transaction(async () => {
        const saveFileandData = async (uploadedFile) => {
            let saveFileLocation = path.join(BaseFileDir, ...JSON.parse(location));;
            const newFileName = uuidv4() + path.extname(uploadedFile.name);
            await File.create({
                person_id: "65281b37c6a57e8fcd6bdc6d",
                name: newFileName,
                location: JSON.parse(location),
            });
            fs.mkdirSync(saveFileLocation, { recursive: true });
            uploadedFile.mv(path.join(saveFileLocation, newFileName));
        }

        if (typeof fileList === 'object' && fileList !== null && !Array.isArray(fileList)) {
            await saveFileandData(fileList);
        } else {
            for (const fileKey in fileList) {
                const uploadedFile = fileList[fileKey];
                await saveFileandData(uploadedFile);
            }
        }

    });
    if (result === true) {
        res.send({ message: mSaveFile.ok });
    } else {
        res.status(result.statusCode || 422).json({ message: mSaveFile.fail });
    }
}

exports.deleteFile = async (req, res, next) => {
    const { location, fileName } = req.body;
    const result = await transaction(async () => {
        const file = await File.findOne({ location: { $eq: location }, name: fileName });

        console.log(location, fileName);
        if (!file) {
            const error = new Error();
            error.message = { message: mDeleteFile.fail };
            error.statusCode = 422;
            throw error;
        }
        const fileLocation = path.join(BaseFileDir, file.location.join(path.sep), file.name);
        fs.unlinkSync(fileLocation, { recursive: true });
        await File.deleteOne({ _id: file._id });
    });
    if (res != null) {
        if (result === true) {
            res.send({ message: mDeleteFile.ok });
        } else {
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
        let filesFiltered = [];
        files.forEach(element => {
            if (element.includes(".")) {
                const fileName = element.substring(element.lastIndexOf(path.sep) + 1);
                filesFiltered.push(fileName);
            }
        });
        const result = await File.find({ name: filesFiltered });
        for (const file of result) {
            await this.deleteFile({ body: { location: file.location, fileName: file.name } }, null, null);
        }
        await fs.rmSync(folderLocation, { recursive: true });
        res.send({ message: mDeleteFolder.ok });
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: mDeleteFolder.fail });
    }
}

exports.file = async (req, res, next) => {
    try {
        const { file_id } = req.params;
        const file = await File.findOne({ _id: file_id });
        if (!file) {
            const error = new Error();
            error.message = { message: mDeleteFile.fail };
            error.statusCode = 422;
            throw error;
        }
        const fileLocation = path.join(BaseFileDir, file.location, file.name);
        res.sendFile(fileLocation);
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: deleteFolder.fail });
    }
}


exports.folderFileList = async (req, res, next) => {
    const { location } = req.body;
    try {
        const folderLocation = path.join(BaseFileDir, ...location);
        const content = await getFilesFromFolder(folderLocation);
        const baseUrl = process.env.BASE_URL +
            [JSON.parse(process.env.STORAGE_LOCATION)[2], ...location].join("/") +
            "/";
        res.send({ baseUrl, content });
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: mFolderFileList.fail });
    }
}

exports.createFolder = async (req, res, next) => {
    const { location, folderName } = req.body;
    try {
        const folderLocation = path.join(BaseFileDir, ...location);
        fs.mkdirSync((folderLocation + "/" + folderName), { recursive: true });
        res.send({ message: mCreateFolder.ok });
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: mCreateFolder.fail });
    }
}


exports.renameFolder = async (req, res, next) => {
    const { location, oldName, newName } = req.body;

    const result = await transaction(async () => {

        let oldLocation = [...location];
        oldLocation.push(oldName);
        let newLocation = [...location];
        newLocation.push(newName);

        const files = await File.find({ location: { $elemMatch: { $in: oldLocation } } });

        for (let i = 0; i < files.length; i++) {
            const { _id } = files[i];
            const originalArray = files[i].location;
            const matchIndex = originalArray.findIndex((element, index) => {
                for (let i = 0; i < oldLocation.length; i++) {
                    if (originalArray[index + i] !== oldLocation[i]) {
                        return false;
                    }
                }
                return true;
            });
            if (matchIndex !== -1) {
                originalArray.splice(matchIndex, oldLocation.length, ...newLocation);
            }
            await File.updateOne({ _id }, { location: originalArray });
        }
        fs.renameSync(path.join(BaseFileDir, ...location, oldName), path.join(BaseFileDir, ...location, newName), { recursive: true });
    });
    if (result === true) {
        res.send({ message: mRenameFolder.ok });
    } else {
        res.status(result.statusCode || 422).json({ message: mRenameFolder.fail });
    }
}

exports.renameFile = async (req, res, next) => {
    const { location, oldName, newName } = req.body;
    console.log(location, oldName, newName);
    const result = await transaction(async () => {
        let file = await File.findOne({
            $or: [
                { location: { $all: location }, name: oldName },
                { location }
            ]
        });
        if (!file) {
            throw new Error();
        }
        const oldLocation = path.join(BaseFileDir, file.location.join(), oldName);
        const newLocation = path.join(BaseFileDir, file.location.join(), newName);

        if (fs.existsSync(newLocation)) {
            throw new Error();
        }
        file = await File.updateOne({ _id: file._id }, { name: newName });
        if (file.modifiedCount != 1) {
            throw new Error();
        }
        fs.renameSync(oldLocation, newLocation, { recursive: true });

    });
    if (result === true) {
        res.send({ message: mRenameFile.ok });
    } else {
        res.status(result.statusCode || 422).json({ message: mRenameFile.fail });
    }
}