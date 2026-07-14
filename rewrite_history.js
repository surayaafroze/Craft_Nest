const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // replace `${serverUrl}/api with `/api/backend
  // Be careful with the backtick, we just replace ${serverUrl}/api with /api/backend globally.
  // Actually we can just do: content.split('${serverUrl}/api').join('/api/backend')
  content = content.split('${serverUrl}/api').join('/api/backend');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
  }
});
console.log('Modified ' + changedCount + ' files.');
