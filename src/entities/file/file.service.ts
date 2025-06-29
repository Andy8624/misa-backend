import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

// Define a common interface for file metadata to be returned
export interface UploadedFileInfo {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  fileUrl: string;
}

@Injectable()
export class FileService {
  private readonly directusUrl = process.env.DIRECTUS_URL;
  private readonly directusEmail = process.env.DIRECTUS_EMAIL;
  private readonly directusPassword = process.env.DIRECTUS_PASSWORD;

  constructor(private prisma: PrismaService) {
    if (!this.directusUrl || !this.directusEmail || !this.directusPassword) {
      console.warn(
        'Directus environment variables are not fully set. File uploads may fail.',
      );
    }
  }

  /**
   * Authenticates with Directus and returns an access token.
   * @private
   * @returns {Promise<string>} The Directus access token.
   * @throws {BadRequestException} If authentication fails.
   */
  private async getDirectusAccessToken(): Promise<string> {
    try {
      const authResponse = await axios.post(`${this.directusUrl}/auth/login`, {
        email: this.directusEmail,
        password: this.directusPassword,
      });
      return authResponse.data.data.access_token;
    } catch (error) {
      console.error(
        'Directus authentication error:',
        error.response?.data?.errors || error.message,
      );
      throw new BadRequestException(
        'Failed to authenticate with Directus. Check credentials and URL.',
      );
    }
  }

  /**
   * Uploads a FormData object containing file data to Directus.
   * This is a reusable helper for both local and Base64 file uploads.
   * @private
   * @param {FormData} formData - The FormData object with the file.
   * @param {string} accessToken - Directus access token.
   * @returns {Promise<any>} Directus file data response.
   * @throws {BadRequestException} If Directus upload fails.
   */
  private async uploadToDirectus(
    formData: FormData,
    accessToken: string,
  ): Promise<any> {
    try {
      const uploadResponse = await axios.post(
        `${this.directusUrl}/files`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${accessToken}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        } as AxiosRequestConfig,
      );
      return uploadResponse.data.data;
    } catch (error) {
      console.error(
        'Directus file upload error:',
        error.response?.data?.errors || error.message,
      );
      throw new BadRequestException(
        `Failed to upload file to Directus: ${error.message}`,
      );
    }
  }

  /**
   * Saves file metadata to the database.
   * This is a reusable helper for both local and Base64 file uploads.
   * @private
   * @param {object} metadata - File metadata including originalName, fileSize, mimeType, etc.
   * @param {string} companyId - The ID of the associated company.
   * @returns {Promise<UploadedFileInfo>} The saved file record's essential info.
   */
  private async saveFileMetadataToDb(
    metadata: {
      fileName: string;
      fileSize: number;
      mimeType: string;
      originalName: string;
      fileUrl: string;
      directusId: string;
    },
    companyId: string,
  ): Promise<UploadedFileInfo> {
    try {
      // 'path' field is completely removed from the data object
      const fileRecord = await this.prisma.file.create({
        data: {
          fileName: metadata.fileName,
          fileSize: metadata.fileSize,
          mimeType: metadata.mimeType,
          originalName: metadata.originalName,
          fileUrl: metadata.fileUrl,
          directusId: metadata.directusId,
          company: { connect: { id: companyId } },
        },
      });

      return {
        id: fileRecord.id,
        originalName: fileRecord.originalName,
        fileName: fileRecord.fileName,
        mimeType: fileRecord.mimeType,
        size: fileRecord.fileSize,
        fileUrl: fileRecord.fileUrl,
      };
    } catch (dbError) {
      console.error('Database save error for file metadata:', dbError);
      throw new BadRequestException(
        'Failed to save file metadata to database.',
      );
    }
  }

  /**
   * Uploads a file that has been saved locally by Multer (e.g., from a form-data request).
   * @param {Express.Multer.File} file - The Multer file object.
   * @param {string} companyId - The ID of the associated company.
   * @returns {Promise<UploadedFileInfo>} Essential information about the uploaded file.
   * @throws {BadRequestException} If the file is invalid or upload fails.
   */
  async uploadFile(
    file: Express.Multer.File,
    companyId: string,
  ): Promise<UploadedFileInfo> {
    if (!file || !file.path) {
      throw new BadRequestException(
        'Invalid file or missing path for local upload.',
      );
    }

    try {
      const accessToken = await this.getDirectusAccessToken();

      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path));

      const directusFileData = await this.uploadToDirectus(
        formData,
        accessToken,
      );

      const fileMetadata = {
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        originalName: file.originalname,
        fileUrl: `${this.directusUrl}/assets/${directusFileData.id}`,
        directusId: directusFileData.id,
      };

      const savedFileInfo = await this.saveFileMetadataToDb(
        fileMetadata,
        companyId,
      );

      // Ensure temporary file is deleted
      await unlinkAsync(file.path);

      return savedFileInfo;
    } catch (error) {
      console.error('Error during local file upload process:', error.message);
      // Ensure temp file is cleaned up even on error
      if (file?.path && fs.existsSync(file.path)) {
        await unlinkAsync(file.path).catch((e) =>
          console.warn(`Failed to delete temp file ${file.path}:`, e),
        );
      }
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        `Failed to upload local file: ${error.message}`,
      );
    }
  }

  /**
   * Uploads a file provided as a Base64 string within the request body.
   * @param {string} fileBase64 - The Base64 encoded string of the file (e.g., "data:image/png;base64,...").
   * @param {string} originalFileName - The original name of the file (e.g., "document.pdf").
   * @param {string} companyId - The ID of the associated company.
   * @returns {Promise<UploadedFileInfo>} Essential information about the uploaded file.
   * @throws {BadRequestException} If the Base64 string is invalid or upload fails.
   */
  async uploadBase64File(
    fileBase64: string,
    originalFileName: string,
    companyId: string,
  ): Promise<UploadedFileInfo> {
    if (!fileBase64) {
      throw new BadRequestException('No Base64 file string provided.');
    }
    if (!originalFileName) {
      throw new BadRequestException(
        'Original file name is required for Base64 upload.',
      );
    }

    const base64Parts = fileBase64.match(
      /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/,
    );
    if (!base64Parts || base64Parts.length !== 3) {
      throw new BadRequestException(
        'Invalid fileBase64 format. Expected "data:[mime-type];base64,[data]".',
      );
    }

    const mimeType = base64Parts[1];
    const base64Data = base64Parts[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const fileSize = buffer.length;

    try {
      const accessToken = await this.getDirectusAccessToken();

      const formData = new FormData();
      // It's often good practice to make the filename unique for Directus,
      // especially if originalFileName might not always be unique across uploads.
      // Directus itself will generate a unique ID, but the filename is also stored.
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${originalFileName}`; // Example: add timestamp
      formData.append('file', buffer, {
        filename: uniqueFileName, // Use the unique filename for Directus upload
        contentType: mimeType,
        knownLength: fileSize,
      });

      const directusFileData = await this.uploadToDirectus(
        formData,
        accessToken,
      );

      const fileMetadata = {
        fileName: originalFileName, // Keep originalName for your DB record if preferred
        fileSize: fileSize,
        mimeType: mimeType,
        originalName: originalFileName,
        fileUrl: `${this.directusUrl}/assets/${directusFileData.id}`,
        directusId: directusFileData.id,
        // 'path' is completely removed for Base64 uploads
      };

      const savedFileInfo = await this.saveFileMetadataToDb(
        fileMetadata,
        companyId,
      );

      return savedFileInfo;
    } catch (error) {
      console.error('Error during Base64 file upload process:', error.message);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        `Failed to upload Base64 file: ${error.message}`,
      );
    }
  }

  /**
   * Deletes a file from Directus and its metadata from the database.
   * @param {string} fileId - The ID of the file record in your database.
   * @returns {Promise<void>}
   * @throws {BadRequestException} If deletion fails.
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      const fileRecord = await this.prisma.file.findUnique({
        where: { id: fileId },
        select: { directusId: true },
      });

      if (!fileRecord) {
        throw new BadRequestException('File record not found in database.');
      }

      const accessToken = await this.getDirectusAccessToken();

      await axios.delete(`${this.directusUrl}/files/${fileRecord.directusId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await this.prisma.file.delete({
        where: { id: fileId },
      });
    } catch (error) {
      console.error(
        'File deletion error:',
        error.response?.data?.errors || error.message,
      );
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(`Failed to delete file: ${error.message}`);
    }
  }
}
