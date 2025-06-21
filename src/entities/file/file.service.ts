import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadFile(file) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const customerId = '12';

    const newFile = await this.prismaService.file.create({
      data: {
        fileName: file.filename,
        fileSize: file.size,
        mimeType: file.mimetype || 'png',
        path: file.path,
        customerId: customerId,
      },
    });

    console.log(newFile);

    return { message: 'File uploaded successfully' };
  }

  create(createFileDto: CreateFileDto) {
    console.log(createFileDto);
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    console.log(updateFileDto);
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
