"use strict";
const s3 = require("../lib/s3");

module.exports.handler = async () => {
  try {
    const dirs = await s3.getDirectories(process.env.PROCESSED_S3);

    let [files] = await s3.getAllFiles(dirs, process.env.PROCESSED_S3);
    files = s3.filterForFileNames(files);
    files = s3.appendCloudFrontUrl(files);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: files
      })
    };
  } catch (e) {
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        data: e.message || "Internal Server Error"
      })
    };
  }
};
