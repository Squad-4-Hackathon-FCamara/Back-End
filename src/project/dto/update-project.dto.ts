// import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
