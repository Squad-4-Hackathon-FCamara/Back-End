import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(newProject);
  }

  findOne(id: string) {
    return `This action returns a #${id} project`;
  }

  findByTags() {}

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
