import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({
    message: 'O título deve ser preenchido',
  })
  @IsString({
    message: 'O título deve ser uma string',
  })
  @MaxLength(30, {
    message: 'O título deve ter no máximo 30 caracteres',
  })
  title: string;

  @IsNotEmpty({
    message: 'A URL deve ser preenchida',
  })
  url: string;

  @IsNotEmpty({ message: 'O campo de tags não pode estar vazio' })
  @IsArray({ message: 'O campo de tags deve vir como um array' })
  tags: string[];

  @IsOptional()
  @MaxLength(350, {
    message: 'A descrição deve ter no máximo 350 caracteres',
  })
  description: string;
}
