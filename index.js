const fs = require('fs');
const path = require('path');
const parseFolderToObject = require('./parser/parseFolderToObject');
const parseObjectToHTML = require('./parser/parseObjectToHTML');

const docsPath = path.join(__dirname, 'docs');

const main = async () => {
    const obj = await parseFolderToObject('/tests/testing-sets/one-element');

    const files = fs.readdirSync(docsPath);
    for (const file of files) {
        if (file.includes('.html')) {
            fs.unlinkSync(path.join(docsPath, file));
        }
    }

    for (let page of obj) {
        await parseObjectToHTML(page.pageTitle, page);
    }
}

main();