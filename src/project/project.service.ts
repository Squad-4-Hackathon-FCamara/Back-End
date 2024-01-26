import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
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
