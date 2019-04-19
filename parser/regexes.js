module.exports = {
    name: /^#\s+.+/,
    section: /^#{2}\s+.+/,
    content: /^#{3}\s+.+/,
    codeStart: /```(\w+)/,
    codeEnd: /```/,
    example: /Example:\s*(.*)/,
};
