const fs = require('fs/promises');
const path = require('path');

const newFolderPath = path.join(__dirname, 'project-dist');

async function createDir(dirName) {
  await fs.rm(dirName, { recursive: true, force: true });
  await fs.mkdir(dirName);
}

async function createNewHtml() {
  const componentsPath = path.join(__dirname, 'components');
  const files = await fs.readdir(componentsPath, { withFileTypes: true });
  
  let htmlBase = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');

  for (let file of files) {
    const componentContent = await fs.readFile(path.join(componentsPath, `${file.name}`), 'utf-8');
    const regExp = new RegExp(`{{${(file.name).split('.')[0]}}}`, 'g');
    htmlBase = htmlBase.replace(regExp, componentContent);
  }

  await fs.writeFile(path.join(newFolderPath, 'index.html'), htmlBase);
}

async function writeFiles() {
  const cssPath = path.join(__dirname, 'styles');
  const files = await fs.readdir(cssPath, { withFileTypes: true });
  const styles = [];

  for (let file of files) {
    const pathToFile = path.join(cssPath, file.name);
    const fileType = path.extname(pathToFile);

    if (fileType === '.css') {
      const content = await fs.readFile(pathToFile, 'utf8');
      styles.push(content);
    }
  }
  await fs.writeFile(path.join(newFolderPath, 'style.css'), styles.join('\n'), 'utf8');
}

async function copyDir(from, to) {
  const files = await fs.readdir(from, { withFileTypes: true });
  for (let file of files) {
    if (file.isFile()) {
      await fs.copyFile(path.join(from, file.name), path.join(to, file.name));
    } else if (file.isDirectory()) {
      await fs.mkdir(path.join(to, file.name), { recursive: true });
      await copyDir(path.join(from, file.name), path.join(to, file.name));
    }
  }
}

(async () => {
  createDir(newFolderPath);
  writeFiles();
  copyDir(path.join(__dirname, 'assets'), path.join(newFolderPath, 'assets'));
  createNewHtml();
})();