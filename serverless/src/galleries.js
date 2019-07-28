"use strict";
const s3 = require("/opt/s3/s3");
const fileNamer = require("/opt/utils/file-namer");
module.exports.handler = async () => {
  try {
    const dirs = await s3.getDirectories(process.env.PROCESSED_S3);

    let [files] = await s3.getAllFiles(dirs, process.env.PROCESSED_S3);
    files = fileNamer.filterForFileNames(files);
    files = fileNamer.appendCloudFrontUrl(files);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        data: files
      })
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: e.statusCode || 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        data: e.message || "Internal Server Error"
      })
    };
  }
};
