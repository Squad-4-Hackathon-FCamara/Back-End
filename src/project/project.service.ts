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
    const project = this.projectRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    return project;
  }

  findByTags() {}

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: string) {
    const project = await this.projectRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    await this.projectRepository.delete(project.id);
    return { message: 'Projeto apagado com sucesso!' };
  }
}
