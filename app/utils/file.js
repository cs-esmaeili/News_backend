const path = require('path');
const fs = require('fs');

exports.getFilesFromFolder = (folderPath) => {
    const contents = fs.readdirSync(folderPath);
    let files = [];
    let folders = [];
    contents.forEach((element) => {
        const filePath = path.join(folderPath, element);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isFile()) {
            files.push(element);
        } else if (fileStat.isDirectory()) {
            folders.push(element);
        }
    });
    return { files, folders };
}