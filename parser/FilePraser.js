const fs = require('fs');
const readline = require('readline');
const regexes = require('./regexes');

class FileParser {
    constructor(filePath) {
        this.filePath = filePath;
        this.file = { sections: [] };
        this.isCodeParsing = false;
        this.currentSection = 0;
        this.currentContent = 0;

        this.file.pageTitle = /\/([a-z\-]+)\.md/g.exec(filePath)[1];
        this.parseLine = this.parseLine.bind(this);
    }

    parse() {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: fs.createReadStream(this.filePath),
            });
            
            rl.on('line', this.parseLine);
            rl.on('close', () => resolve(this.file));
        });
    }

    parseLine(line) {
        this.line = line;

        if      (this.matchLine('name'))      this.setName();
        else if (this.matchLine('section'))   this.createSection();
        else if (this.matchLine('content'))   this.createContent();
        else if (this.matchLine('codeStart')) this.startCode();
        else if (this.matchLine('codeEnd'))   this.endCode();
        else if (this.matchLine('example'))   this.setExample();
        else if (this.isCodeParsing)          this.addCodeLine();
        else if (this.line)                   this.setDescription();
    }

    matchLine(name) {
        return this.line.match(regexes[name]);
    }

    setName() {
        this.file.name = this.line.slice(2);
    }

    createSection() {
        this.file.sections.push({ title: this.line.slice(3), content: [] });
        this.section = this.file.sections[this.file.sections.length - 1];
    }

    createContent() {
        this.section.content.push({ title: this.line.slice(4) });
        this.content = this.section && this.section.content[this.section.content.length - 1];
    }

    startCode() {
        this.content.code = '';
        this.content.language = this.line.match(regexes.codeStart)[1];
        this.isCodeParsing = true;
    }

    addCodeLine() {
        this.content.code += this.line ? this.line + '\n' : '\n';
    }

    endCode() {
        this.content.code = this.content.code.trim();
        this.isCodeParsing = false;
    }

    setExample() {
        this.content.example = this.line.match(regexes.example)[1];
    }

    setDescription() {
        this.content.description = this.line;
    }
}

module.exports = FileParser;