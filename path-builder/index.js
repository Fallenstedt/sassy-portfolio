const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);

const readLocation = path.resolve(__dirname, '..', 'static', 'gallery');
const writeLocation = path.resolve(__dirname, '..', 'static');

async function main() {
  const dataToWrite = await generateFileList();
  writeJsonFile(dataToWrite);
}

async function generateFileList() {
  const result = {};
  const galleryNames = await readdir(readLocation)
    .then(names => names)
    .catch(err => err);

  galleryNames.forEach(gallery => {
    const dirFile = path.join(readLocation, gallery);
    result[gallery] = [];
    fs.readdirSync(dirFile).forEach(file => {
      result[gallery].push(file);
    });
  });
  return result;
}

async function writeJsonFile(fileToWrite) {
  await fs.writeFile(
    `${writeLocation}/images.json`,
    JSON.stringify(fileToWrite)
  );
  console.log('done!');
}

main();
