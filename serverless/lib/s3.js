"use strict";

const promisifyS3 = require("./promsify-s3");

module.exports = {
  async getDirectories(bucket) {
    const d = await promisifyS3.getDirectories(bucket);
    return d.CommonPrefixes;
  },
  async getAllFiles(dirs, bucket) {
    return await Promise.all(
      dirs.map(async ({ Prefix }) => {
        return await promisifyS3.getFilesInDirectory(bucket, Prefix);
      })
    );
  },
  appendCloudFrontUrl(files) {
    return files.map(f => `${process.env.CLOUDFRONT}/${f.Key}`);
  },
  filterForFileNames(files) {
    const excludeDirectory = files.Contents.filter(f => {
      return f.Key != files.Prefix;
    });
    return excludeDirectory;
  }
};
