const fs = require('fs/promises');
const path = require('path');
const styles = [];

(async () => {
  const pathToFolder = path.join(__dirname, 'styles');
  const files = await fs.readdir(pathToFolder, { withFileTypes: true });
  for (let file of files) {
    const pathToFile = path.join(pathToFolder, file.name);
    const fileType = path.extname(pathToFile);
    const content = await fs.readFile(pathToFile, 'utf8');

    if (fileType === '.css') {
      styles.push(content);
    }
  }
  await fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), styles.join('\n'), 'utf8');
})();