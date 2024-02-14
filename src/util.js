const fs = require('node:fs');

const writeFile = (file, content) => {
    try {
        fs.writeFileSync(file, JSON.stringify(content, null, "\t"));
    } catch (err) {
        console.error(err);
    }
}

module.exports = writeFile