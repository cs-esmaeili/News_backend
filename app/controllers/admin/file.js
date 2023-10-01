const File = require("../../database/models/File");
const path = require('path');
const fs = require('fs');
const BaseFileDir = path.join(process.cwd(), process.env.STORAGE_LOCATION);
const { v4: uuidv4 } = require('uuid');

exports.saveFile = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    try {
        const { location } = req.body;
        const fileList = req.files['files[]'];

        for (const fileKey in fileList) {
            const uploadedFile = fileList[fileKey];
            const saveFileLocation = path.join(BaseFileDir, ...JSON.parse(location));
            fs.mkdirSync(saveFileLocation, { recursive: true });
            const newFileName = uuidv4() + path.extname(uploadedFile.name);
            uploadedFile.mv(path.join(saveFileLocation, newFileName));
            await File.create({
                person_id: req.body.user._id,
                name: newFileName,
                location: saveFileLocation,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    return res.send('All files uploaded successfully');
}