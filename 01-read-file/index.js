const fs = require('fs');
const path = require('path');
const process = require('process');

const fileData = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
fileData.on('data', data => process.stdout.write(data));