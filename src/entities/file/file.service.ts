import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';

@Injectable()
export class FileService {
  private readonly directusUrl = process.env.DIRECTUS_URL;
  private readonly directusEmail = process.env.DIRECTUS_EMAIL;
  private readonly directusPassword = process.env.DIRECTUS_PASSWORD;

  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File, companyId: string) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      // 1. Authenticate Directus
      const authResponse = await axios.post(`${this.directusUrl}/auth/login`, {
        email: this.directusEmail,
        password: this.directusPassword,
      });

      const accessToken = authResponse.data.data.access_token;

      // 2. Upload file to Directus
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.path));

      const uploadResponse = await axios.post(
        `${this.directusUrl}/files`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const fileData = uploadResponse.data.data;

      // 3. Save file metadata to DB
      const fileRecord = await this.prisma.file.create({
        data: {
          fileName: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
          path: file.path,
          originalName: file.originalname,
          fileUrl: `${this.directusUrl}/assets/${fileData.id}`,
          directusId: fileData.id,
          company: { connect: { id: companyId } },
        },
      });

      // 4. Create FileAttachment link
      // await this.prisma.fileAttachment.create({
      //   data: {
      //     fileId: fileRecord.id,
      //   },
      // });

      // 5. Delete temp file
      fs.unlinkSync(file.path);

      // Return file info
      return {
        id: fileRecord.id,
        originalName: fileRecord.originalName,
        fileName: fileRecord.fileName,
        mimeType: fileRecord.mimeType,
        size: fileRecord.fileSize,
        fileUrl: fileRecord.fileUrl,
      };
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);

      // Cleanup temp file if exists
      if (file && file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }
}
