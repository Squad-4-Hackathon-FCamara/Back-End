import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @IsNotEmpty()
  url: string;

  @IsOptional()
  @MaxLength(350)
  description: string;

  @IsNotEmpty()
  thumbnail_url: string;
}
