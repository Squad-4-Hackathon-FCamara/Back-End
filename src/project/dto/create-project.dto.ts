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

  @IsString({
    message: 'A URL deve ser uma string',
  })
  @IsNotEmpty({
    message: 'A URL deve ser preenchida',
  })
  @IsUrl(
    {
      protocols: ['http', 'https', 'ftp'],
      require_protocol: true,
    },
    {
      message: 'A URL fornecida é inválida.',
    },
  )
  url: string;

  @IsOptional()
  @MaxLength(350)
  description: string;

  @IsNotEmpty()
  thumbnail_url: string;
}
