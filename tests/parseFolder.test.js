const { expect } = require('chai');

const parseFolderToObject = require('../parser/parseFolderToObject');

describe('parseFolderToObject', () => {
  describe('When folder with only one file is provided', () => {
    it('generates proper object', () => {
      return parseFolderToObject('/tests/testing-sets/one-element')
        .then(obj => {
            expect(obj).to.deep.equal([{
              name: 'React',
              pageTitle: 'one-element',
              sections: [{
                  title: 'Creating components',
                  content: [{
                      title: 'Functional components',
                      code: 'import React from \'react\';\n\nconst MyComponent = (props) => {\n    return (\n        <div>Hello World</div>\n    );\n}\n\nexport default MyComponent;',
                      language: 'jsx',
                      description: 'Simple function that returns JSX.',
                      example: 'https://www.google.pl/',
                  }],
              }],
          }]);
      })
    });
  });
});
