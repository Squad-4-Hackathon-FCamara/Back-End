import { ApiProperty } from '@nestjs/swagger';
import { UpdateProjectDto } from './update-project.dto';

export class UpdateProjectFileUploadDto extends UpdateProjectDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any;
}
