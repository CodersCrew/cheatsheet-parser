const fs = require('fs').promises;
const ejs = require("ejs");
const path = require("path");
const parseFolderToObject = require('./parser/parseFolderToObject');

const dir = path.join(__dirname, 'docs');

function ejs2html(path, information) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) { console.log(err); return false; }
        const ejs_string = data,
            template = ejs.compile(ejs_string),
            html = template(information);

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFile(path + '.html', html, function(err) {
            if(err) { console.log(err); return false }
            return true;
        });  
    });
}

const main = async () => {
    const obj = await parseFolderToObject('/tests/testing-sets/one-element');
    const file = await fs.promises.readFile(path.join(__dirname, 'template', 'index.ejs'), 'utf8');
    ejs2html(path.join(dir, 'index'));
    console.log(file);
}

main();