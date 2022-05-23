const fs = require('fs/promises');
const path = require('path');
const process = require('process');

async function copyDir(from, to) {
  try {
    const files = await fs.readdir(from, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        await fs.copyFile(path.join(from, file.name), path.join(to, file.name));
      } else if (file.isDirectory()) {
        await fs.mkdir(path.join(to, file.name));
        await copyDir(path.join(from, file.name), path.join(to, file.name));
      }
    }
  } catch (error) {
    process.stdout.write(error.message);
  }
}

(async function () {
  const pathTo = path.join(__dirname, 'files-copy');
  await fs.rm(pathTo, { recursive: true, force: true });
  await fs.mkdir(pathTo, { recursive: true });
  await copyDir(path.join(__dirname, 'files'), pathTo);
})();