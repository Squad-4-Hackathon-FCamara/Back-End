import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class CreateProjectFileUploadDto extends CreateProjectDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any;
}
