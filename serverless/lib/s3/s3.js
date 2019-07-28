"use strict";

const { PassThrough } = require("stream");
const promisifyS3 = require("./promsify-s3");
const AWS = require("aws-sdk");
const S3 = new AWS.S3({ apiVersion: "2006-03-01" });

module.exports = {
  writeFileAsStream(Bucket, Key) {
    const pass = new PassThrough();
    return {
      writeStream: pass,
      uploadFinished: S3.upload({
        Body: pass,
        Bucket,
        ContentType: "image/png",
        Key
      }).promise()
    };
  },
  getFileAsReadStream(Bucket, Key) {
    return S3.getObject({ Bucket, Key }).createReadStream();
  },
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
  }
};
