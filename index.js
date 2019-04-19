const parseFolderToObject = require('./parser/parseFolderToObject');
const cleanDocsFolder = require('./parser/cleanDocsFolder');
const parseObjectToHTML = require('./parser/parseObjectToHTML');

const main = async () => {
    const obj = await parseFolderToObject('/cheatsheets');

    await cleanDocsFolder();

    for (let page of obj) {
        await parseObjectToHTML(page.pageTitle, page);
    }
}

main();