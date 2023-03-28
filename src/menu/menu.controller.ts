import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { Response } from 'express';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/menu',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(@UploadedFile() file, @Body() createMenuDto: CreateMenuDto) {
    console.log({
      ...createMenuDto,
      filename: file.name,
    });
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }

  @Get('image/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './upload/menu' });
  }
}
