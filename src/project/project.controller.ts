import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  HttpStatus,
  MaxFileSizeValidator,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ResponseDto } from 'src/utils/response-dto/response-dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Imagem não pode ter mais de 200kb',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (file && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
      throw new BadRequestException('Imagem deve ter algum dos formatos: JPG ou PNG');

    const { id: userId } = req.user as { id: string };

    await this.projectService.create(createProjectDto, userId, file);

    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: 'Projeto criado com sucesso!',
      error: false,
    };
    return response;
  }

  @Get('discovery')
  @UseGuards(AuthGuard('jwt'))
  async discovery(@Req() req: Request) {
    const { id: userId } = req.user as { id: string };

    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: await this.projectService.discovery(userId),
      error: false,
    };

    return response;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: await this.projectService.findOne(id),
      error: false,
    };

    return response;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Imagem não pode ter mais de 200kb',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (file && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
      throw new BadRequestException('Imagem deve ter algum dos formatos: JPG ou PNG');

    const { id: userId } = req.user as { id: string };

    await this.projectService.update(id, updateProjectDto, userId, file);
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'Projeto atualizado com sucesso!',
      error: false,
    };
    return response;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Req() req: Request) {
    const { id: userId } = req.user as { id: string };
    await this.projectService.remove(id, userId);

    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'Projeto deletado com sucesso!',
      error: false,
    };
    return response;
  }
}
