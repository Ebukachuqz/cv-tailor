import { ICloudStorageService } from "@/domain/services";
import { S3Service } from "./AWS/s3/s3service";

export class CloudStorageService
  extends S3Service
  implements ICloudStorageService {}
