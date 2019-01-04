const fs = require('fs');
const path = require('path');
const readLocation = path.resolve(__dirname, '..', 'static', 'gallery');
const writeLocation = path.resolve(__dirname, '..', 'static');

function main() {
  writeJsonFile(generateFileList());
}

function generateFileList() {
  const result = {};
  const galleryNames = fs.readdirSync(readLocation).map(gallery => {
    const dirFile = path.join(readLocation, gallery);
    result[gallery] = [];
    fs.readdirSync(dirFile).forEach(file => {
      result[gallery].push({ name: `/gallery/${gallery}/${file}` });
      console.log(file)
    });
  })
  console.log('writing...')
  return result;
}

function writeJsonFile(fileToWrite) {
  fs.writeFileSync(
    `${writeLocation}/images.json`,
    JSON.stringify(fileToWrite)
  )
  console.log('done!');
}

main();
