const File = require("../../database/models/File");
const path = require('path');
const fs = require('fs');
const BaseFileDir = path.join(process.cwd(), ...JSON.parse(process.env.STORAGE_LOCATION));
const { v4: uuidv4 } = require('uuid');
const { transaction } = require('../../database');
const { mSaveFile, mDeleteFile, mDeleteFolder, mFolderFileList, mCreateFolder, mRenameFolder } = require('../../../messages.json');
const { getFilesFromFolder } = require('../../utils/file');


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
                person_id: "651c31131af835e8942ce483",
                name: newFileName,
                location: path.join(...JSON.parse(location)),
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
        const fileLocation = path.join(BaseFileDir, file.location, file.name);
        fs.unlinkSync(fileLocation, { recursive: true });
        await File.deleteOne({ _id: file_id });
    });
    if (res != null) {
        if (result === true) {
            res.send({ message: mDeleteFile.ok });
        } else {
            res.status(result.statusCode || 422).json({ message: mDeleteFile.fail });
        }
    } else {
        console.log(file_id);
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
            await this.deleteFile({ body: { file_id: file._id } }, null, null);
        }
        await fs.rmSync(folderLocation, { recursive: true });
        console.log(folderLocation);
        res.send({ message: mDeleteFolder.ok });
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: mDeleteFolder.fail });
    }
}

// exports.file = async (req, res, next) => {
//     try {
//         const { file_id } = req.params;
//         const file = await File.findOne({ _id: file_id });
//         if (!file) {
//             const error = new Error();
//             error.message = { message: mDeleteFile.fail };
//             error.statusCode = 422;
//             throw error;
//         }
//         const fileLocation = path.join(BaseFileDir, file.location, file.name);
//         res.sendFile(fileLocation);
//     } catch (error) {
//         res.status(error.statusCode || 422).json({ message: deleteFolder.fail });
//     }
// }



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
        console.log(error);
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

exports.renameFolder = async (req, res, next) => {//TODO
    const { location, oldName, newName } = req.body;
    try {
        const folderLocation = path.join(BaseFileDir, ...location);
        const file = await File.find({ location: { $search: (folderLocation + "/" + oldName) } });
        console.log(file);
        // fs.renameSync((folderLocation + "/" + oldName), (folderLocation + "/" + newName), { recursive: true });
        res.send({ message: mRenameFolder.ok });
    } catch (error) {
        res.status(error.statusCode || 422).json({ message: mRenameFolder.fail });
    }
}