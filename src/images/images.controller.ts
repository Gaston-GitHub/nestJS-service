import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Role } from '../users/entities/role.enum';
import { Roles } from '../users/roles.decorator';

@Controller('images')
export class ImagesController {
  @Post('upload')
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = Array(20)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${fileName}${extname(file.originalname)}`);
        },
      }),
      limits: { fieldSize: 1 * 180 * 180 },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
