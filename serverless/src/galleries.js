"use strict";
const promisifyS3 = require("../lib/promsify-s3");
const s3 = require("../lib/s3");

module.exports.handler = async ({ queryStringParameters }, _context) => {
  const doesNotHaveQueryStringBucket =
    !queryStringParameters || !("bucket" in queryStringParameters);

  if (doesNotHaveQueryStringBucket) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        data: "Query string 'bucket' is required"
      })
    };
  }

  try {
    const { bucket } = queryStringParameters;
    const dirs = await s3.getDirectories(bucket);

    let [files] = await s3.getAllFiles(dirs, bucket);
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
