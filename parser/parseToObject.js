const { readdir } = require('fs').promises;
const path = require('path');

const parseToObject = async (fp) => {
    // const folderPath = path.resolve(__dirname, fp)
    const mdContent = await readdir(fp, 'utf8');
    console.log(mdContent);

    return {
        name: 'React',
        sections: [{
            title: 'Creating components',
            content: [{
                title: 'Functional components',
                code: 'import React from \'react\';\n\nconst MyComponent = (props) => {\n\treturn (\n\t\t<div>Hello World</div>\n\t);\n}\n\nexport default MyComponent;',
                language: 'jsx',
                description: 'Simple function that returns JSX.',
                example: 'https://www.google.pl/',
            }],
        }],
    }
}

module.exports = parseToObject;
