const fs = require('fs');
const path = require('path');

const compDir = './components';
let allHtml = fs.readFileSync('index.html', 'utf8');
fs.readdirSync(compDir).forEach(f => {
  if (f.endsWith('.html')) allHtml += '\n' + fs.readFileSync(path.join(compDir, f), 'utf8');
});

const idRegex = /id=["']([^"']+)["']/g;
const htmlIds = new Set();
let match;
while ((match = idRegex.exec(allHtml)) !== null) {
  htmlIds.add(match[1]);
}

const handlerRegex = /on(?:click|submit|change|input)=["'](?:return\s+)?([a-zA-Z0-9_]+)\s*\(/g;
const htmlHandlers = new Set();
while ((match = handlerRegex.exec(allHtml)) !== null) {
  htmlHandlers.add(match[1]);
}

console.log('Total HTML IDs found:', htmlIds.size);
console.log('Total HTML Event Handlers found:', htmlHandlers.size);

const bundleJs = fs.readFileSync('dist/app.bundle.js', 'utf8');

const missingHandlers = [];
for (const handler of htmlHandlers) {
  if (!bundleJs.includes('function ' + handler) && !bundleJs.includes(handler + ' =') && !bundleJs.includes(handler + ':')) {
    if (['event', 'window', 'return', 'this', 'Boolean'].includes(handler)) continue;
    missingHandlers.push(handler);
  }
}

console.log('Missing Handlers in JS:', missingHandlers);

const getElRegex = /getElementById\(["']([^"']+)["']\)/g;
const missingIds = [];
while ((match = getElRegex.exec(bundleJs)) !== null) {
  const id = match[1];
  if (!htmlIds.has(id)) {
    missingIds.push(id);
  }
}
const uniqueMissingIds = [...new Set(missingIds)];
console.log('Unique IDs called in JS but NOT found in HTML:', uniqueMissingIds);
