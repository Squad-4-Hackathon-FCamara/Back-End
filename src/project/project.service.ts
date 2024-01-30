import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as FormData from 'form-data';
import ImgurClient from 'imgur';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Equal, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ResponseDto } from 'src/utils/response-dto/response-dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projetcRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string, file: Express.Multer.File) {
    const user: User = await this.userService.findOne(userId);

    const newProject = this.projetcRepository.create(createProjectDto);
    newProject.user = user;

    const data = new FormData();
    data.append('image', JSON.stringify(file));

    const client = new ImgurClient({ clientId: process.env.Client_ID_Imgur });

    const thumbnail = await client.upload({
      image: file.buffer,
      type: 'stream',
    });

    newProject.thumbnail_url = thumbnail.data.link;
    await this.projetcRepository.save(newProject);

    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: 'Projeto criado com sucesso!',
      error: false,
    };
    return response;
  }

  async findOne(id: string) {
    const project: Project = await this.projectRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: {
        user: true,
        tags: true,
      },
    });
    if (!project) throw new NotFoundException('Projeto não encontrado!');
    return project;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  findByTags() {}

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: string, userId: string) {
    const project: Project = await this.projectRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: {
        user: true,
      },
    });

    if (!project) throw new NotFoundException('Projeto não encontrado!');
    if (project.user.id !== userId)
      throw new UnauthorizedException(
        'Você não pode deletar um projeto de outro usuário!',
      );

    return await this.projectRepository.delete(project.id);
  }
}
