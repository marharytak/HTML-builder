const fs = require('fs/promises');
const path = require('path');
const process = require('process');

(async () => {
  const pathToFolder = path.join(__dirname, 'secret-folder');
  try {
    const files = await fs.readdir(pathToFolder, { withFileTypes: true });
    for (let file of files) {
      if (file.isFile()) {
        const stats = await fs.stat(path.join(pathToFolder, file.name));
        process.stdout.write(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stats.size * 0.001}kb\n`);
      }
    }
  } catch (error) {
    process.stdout.write(error.message);
  }
})();