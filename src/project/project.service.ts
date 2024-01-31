import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
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
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private tagService: TagService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string, file: Express.Multer.File) {
    const user: User = await this.userService.findOne(userId);
    const tags: Tag[] = await this.tagService.findAll();

    const newProject = this.projectRepository.create({ ...createProjectDto, tags: [] });

    const projectTags: Tag[] = tags.filter(
      (tag) => tag.id === createProjectDto.tags.filter((el) => el === tag.id)[0],
    );

    newProject.user = user;
    newProject.tags = projectTags;

    if (file) {
      const data = new FormData();
      data.append('image', JSON.stringify(file));

      const client = new ImgurClient({ clientId: process.env.Client_ID_Imgur });

      const thumbnail = await client.upload({
        image: file.buffer,
        type: 'stream',
      });

      newProject.thumbnail_url = thumbnail.data.link;
    }

    return await this.projectRepository.save(newProject);
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
      select: { user: { avatar_url: true, firstName: true, lastName: true, id: true } },
    });
    if (!project) throw new NotFoundException('Projeto não encontrado!');

    return project;
  }

  async findAllByUser(userId: string) {
    const projects: Project[] = await this.projectRepository.find({
      relations: { tags: true, user: true },
    });
    const filteredProjects = projects.filter((proj) => proj.user.id === userId);

    return filteredProjects;
  }

  async discovery(userId: string) {
    const projects = await this.projectRepository.find({
      relations: { user: true, tags: true },
    });

    const filterProjects = projects.filter((proj) => proj.user.id !== userId);
    return filterProjects;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    const project: Project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (project.user.id !== userId)
      throw new UnauthorizedException(
        'Você não tem permissão para atualizar um projeto de outro usuário!',
      );

    if (!project) throw new NotFoundException('Projeto não encontrado!');

    const tags: Tag[] = await this.tagService.findAll();
    const projectTags: Tag[] = tags.filter(
      (tag) => tag.id === updateProjectDto.tags.filter((el) => el === tag.id)[0],
    );

    project.tags = projectTags;

    if (file) {
      const data = new FormData();
      data.append('image', JSON.stringify(file));

      const client = new ImgurClient({ clientId: process.env.Client_ID_Imgur });

      const thumbnail = await client.upload({
        image: file.buffer,
        type: 'stream',
      });

      project.thumbnail_url = thumbnail.data.link;
    }

    await this.projectRepository.save({
      id,
      ...updateProjectDto,
      tags: projectTags,
      thumbnail_url: project.thumbnail_url,
    });

    return this.projectRepository.findOne({ where: { id } });
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
      throw new UnauthorizedException('Você não pode deletar um projeto de outro usuário!');

    return await this.projectRepository.delete(project.id);
  }
}
