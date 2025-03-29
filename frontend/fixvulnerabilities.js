// This file is used to override react-scripts and fix vulnerabilities
const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Read package.json
const packageJson = require(packageJsonPath);

// Remove the vulnerable versions of packages and add specific versions
packageJson.resolutions = {
  "nth-check": "^2.1.1",
  "postcss": "^8.4.31",
  "svgo": "^3.0.5",
  "@svgr/webpack": "^8.0.1",
  "css-select": "^5.1.0"
};

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Added resolutions to package.json to fix vulnerabilities.');
console.log('Now run: npm install'); 