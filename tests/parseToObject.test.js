const { expect } = require('chai');

const parseToObject = require('../parser/parseToObject');

describe('parseToObject', () => {
  describe('When folder with only one file is provided', () => {
    it('generates proper object', () => {
      return parseToObject(__dirname + '/testing-sets/one-element')
        .then(obj => {
            expect(obj).to.deep.equal({
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
            });
      })
    });
  });
});
