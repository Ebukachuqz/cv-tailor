import { ICloudStorageService } from "@/domain/services";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { s3Config } from "../config";

export class S3Service implements ICloudStorageService {
  private s3 = s3Config;

  async uploadFile(
    file: File,
    filekey: string,
    onProgress: (progress: number) => void
  ): Promise<string> {
    const params: PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: filekey,
      Body: file,
    };

    return new Promise((resolve, reject) => {
      const request = this.s3.putObject(params);

      request.on("httpUploadProgress", (event) => {
        const progress = Math.round((event.loaded / event.total!) * 100);
        onProgress(progress);
      });

      request.send((err, data) => {
        console.log("s3 dataa", data);
        if (err) {
          reject(err);
        } else {
          const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${filekey}`;
          resolve(fileUrl);
        }
      });
    });
  }

  async getFile(fileKey: string): Promise<Buffer> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
    };

    const data = await this.s3.getObject(params).promise();
    return data.Body as Buffer;
  }
}
