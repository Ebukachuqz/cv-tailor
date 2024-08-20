import { FileUpload } from "@/domain/entities";
import { ICloudStorageService } from "@/domain/services";
import { CloudStorageService } from "@/infrastructure";

export class UploadFileUseCase {
  private cloudStorageService: ICloudStorageService;

  constructor() {
    this.cloudStorageService = new CloudStorageService();
  }

  async execute(
    file: File,
    filekey: string,
    onProgress: (progress: number) => void
  ): Promise<string> {
    const fileUrl = await this.cloudStorageService.uploadFile(
      file,
      filekey,
      onProgress
    );

    return fileUrl;
  }
}
