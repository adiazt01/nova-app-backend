import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  create(file: Express.Multer.File) {
    return `This action adds a new file ${file.originalname}`;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
