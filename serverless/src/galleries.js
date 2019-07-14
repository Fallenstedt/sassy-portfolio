"use strict";

const s3 = require("../lib/s3");

module.exports.getGalleries = async (event, _context) => {
  const { queryStringParameters } = event;

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
    const { CommonPrefixes } = await s3.getDirectories(
      queryStringParameters.bucket
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: CommonPrefixes
      })
    };
  } catch (e) {
    return {
      statusCode: e.statusCode,
      body: JSON.stringify({
        data: e.message
      })
    };
  }
};
