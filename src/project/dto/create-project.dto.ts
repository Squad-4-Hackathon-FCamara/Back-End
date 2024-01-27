import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString({
    message: 'O título deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O título deve ser preenchido',
  })
  @MaxLength(30, {
    message: 'O título deve ter no máximo 30 caracteres',
  })
  title: string;

  @IsNotEmpty()
  url: string;

  @IsOptional()
  @MaxLength(350)
  description: string;

  @IsNotEmpty()
  thumbnail_url: string;
}
