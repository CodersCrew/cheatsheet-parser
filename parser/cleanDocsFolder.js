const { readdir, unlink } = require('fs').promises;
const path = require('path');

const docsPath = path.join(__dirname, '..', 'docs');

const cleanDocsFolder = async () => {
    const files = await readdir(docsPath);

    for (const file of files) {
        if (file.includes('.html')) {
            await unlink(path.join(docsPath, file));
        }
    }
}

module.exports = cleanDocsFolder;