import AWS from "aws-sdk";

export const s3Config = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  region: process.env.NEXT_PUBLIC_S3_REGION!,
});
