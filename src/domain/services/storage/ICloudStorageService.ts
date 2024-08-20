export interface ICloudStorageService {
  uploadFile(
    file: File,
    filekey: string,
    onProgress: (progress: number) => void
  ): Promise<string>;
  getFile(fileKey: string): Promise<Buffer>;
}
