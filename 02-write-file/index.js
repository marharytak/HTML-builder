const fs = require('fs');
const path = require('path');
const process = require('process');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.stdout.write('Please enter the text you\'d like to save to the text.txt file\n');
process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') { process.exit(); }
  stream.write(data.toString());
});

process.on('exit', () => process.stdout.write('Text saved successfully\n'));
process.on('SIGINT', process.exit);