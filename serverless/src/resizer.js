"use strict";
const s3 = require("/opt/s3/s3");

module.exports.handler = async event => {
  const Key = event.Records[0].s3.object.key;
  const OriginalsBucket = process.env.ORIGINALS_S3;
  const ProcessedBucket = process.env.PROCESSED_S3;

  console.log("Key", Key);
  console.log("Original S3 Bucket", OriginalsBucket);
  console.log("Processed S3 Bucket", ProcessedBucket);

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

    console.log("Resize complete", uploadedData);
  } catch (e) {
    console.log("something exploded", e.message);
  }
};
