const fs = require('fs');
const path = require('path');
const pug = require('pug');

const outputFolder = path.join(__dirname, '..', 'docs');
const templateFile = path.join(__dirname, 'template', 'index.pug');

const getSnippets = (sections) => sections.reduce((a, c) => {
    a = [ ...a, ...c.content.map(el => el.code) ];
    return a;
}, []);

const getLanguages = (sections) => sections.reduce((a, c) => {
    a = [ ...a, ...c.content.map(el => el.language) ];
    return a;
}, []);

const parseObjectToHTML = async (outputFileName, options = {}) => {
    try {
        const compiledFunction = pug.compileFile(templateFile);

        const snippets = getSnippets(options.sections);
        const languages = getLanguages(options.sections);
        const parsedHTML = compiledFunction({ ...options, snippets, languages: [...new Set(languages)] });

        await fs.promises.writeFile(path.join(outputFolder, outputFileName + '.html'), parsedHTML);
    } catch (ex) {
        console.log(ex);
    }
}

module.exports = parseObjectToHTML;