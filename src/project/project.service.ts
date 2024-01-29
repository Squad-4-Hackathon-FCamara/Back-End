import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as FormData from 'form-data';
import ImgurClient from 'imgur';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projetcRepository: Repository<Project>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string, file: Express.Multer.File) {
    const user: User = await this.userService.findOne(userId);
    const tags: Tag[] = await this.tagService.findAll();

    const newProject = this.projetcRepository.create({ ...createProjectDto, tags: [] });

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

    return await this.projetcRepository.save(newProject);
  }

  // findAll() {
  //   return `This action returns all project`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  findByTags() {}

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
