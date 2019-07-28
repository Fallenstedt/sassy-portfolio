"use strict";

const AWS = require("aws-sdk");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

module.exports = {
  getDirectories(Bucket) {
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(
        {
          Bucket,
          Delimiter: "/"
        },
        (e, d) => {
          if (e) reject(e);
          if (d) resolve(d);
        }
      );
    });
  },
  getFilesInDirectory(Bucket, Prefix) {
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(
        {
          Bucket,
          Prefix
        },
        (e, d) => {
          if (e) reject(e);
          if (d) resolve(d);
        }
      );
    });
  }
};
