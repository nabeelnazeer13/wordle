const fs = require('fs');
const path = require('path');

function loadWords() {
const words = fs
  .readFileSync(path.join(__dirname, 'words_alpha.txt'), 'utf-8')
  .split('\n')
  .map(w => w.trim().toLowerCase())
  .filter(w => w.length > 0);

console.log(`Loaded ${words.length} words`);
return words;
}

module.exports = { loadWords };