const fs = require('fs');
const path = require('path');
const FileParser = require('./FilePraser');
 
const parseFiles = async (filePaths) => {
    const pages = [];

    for (let filePath of filePaths) {
        const fileContentObj = await new FileParser(filePath).parse();
        pages.push(fileContentObj);
    }

    return pages;
}

const parseFolderToObject = async (folderPath) => {
    const fileNames = await fs.promises.readdir(path.join(__dirname, '..', folderPath), 'utf8');
    const filePaths = fileNames.map(fileName => path.join(__dirname, '..', folderPath, fileName));
    const pages = await parseFiles(filePaths);

    return pages
}

module.exports = parseFolderToObject;