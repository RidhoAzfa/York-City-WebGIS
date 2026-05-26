const fs = require('fs');
let text = fs.readFileSync('script.js', 'utf8');

// The file has literal backslash followed by backtick
text = text.replace(/\\`/g, '`');

// The file has literal backslash followed by dollar-sign-brace
text = text.replace(/\\\$\{/g, '${');

fs.writeFileSync('script.js', text);
console.log('Fixed syntax errors in script.js');
