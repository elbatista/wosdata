const fs = require('node:fs');

const writeFile = (file, content) => {
    try {
        fs.writeFileSync(file, JSON.stringify(content, null, "\t"));
    } catch (err) {
        console.error(err);
    }
}

const stripEmojis = (str) =>
  str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();

module.exports = {writeFile, stripEmojis}