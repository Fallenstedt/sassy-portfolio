"use strict";
const s3 = require("/opt/s3/s3");

module.exports.handler = async event => {
  const Key = event.Records[0].s3.object.key;
  const OriginalsBucket = process.env.ORIGINALS_S3;
  const ProcessedBucket = process.env.PROCESSED_S3;

  console.log("Key", Key);
  console.log("originals", OriginalsBucket);
  console.log("processed", ProcessedBucket);

  if (!Key) {
    throw "Cannot resize image without a file path";
  }

  try {
    const readStream = s3.getFileAsReadStream(OriginalsBucket, Key);
    const { writeStream, uploadFinished } = s3.writeFileAsStream(
      ProcessedBucket,
      Key
    );
    readStream.pipe(writeStream);

    const uploadedData = await uploadFinished;

    return {
      status: 200,
      data: JSON.stringify(uploadedData)
    };
  } catch (e) {
    console.log("something exploded", e.message);
  }

  //2019-07-24T04:42:12.324Z bada6cbc-9009-4734-9e22-d35b1c1d5a05 INFO pics/cyberscan.gif
  console.log("I can get files from this bucket", process.env.ORIGINALS_S3);
};
