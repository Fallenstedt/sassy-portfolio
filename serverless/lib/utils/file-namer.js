module.exports = {
  appendCloudFrontUrl(files) {
    return files.map(f => `${process.env.CLOUDFRONT}/${f.Key}`);
  },
  filterForFileNames(files) {
    const allFilesInDirectoryExceptDirectory = files.Contents.filter(f => {
      return f.Key != files.Prefix;
    });
    return allFilesInDirectoryExceptDirectory;
  }
};
