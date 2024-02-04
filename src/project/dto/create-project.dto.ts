import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({
    message: 'title: O título deve ser preenchido',
  })
  @IsString({
    message: 'title: O título deve ser uma string',
  })
  @MaxLength(30, {
    message: 'title: O título deve ter no máximo 30 caracteres',
  })
  title: string;

  @IsNotEmpty({
    message: ':url: A URL deve ser preenchida',
  })
  url: string;

  @IsNotEmpty({ message: 'tags: O campo de tags não pode estar vazio' })
  @IsArray({ message: 'tags: O campo de tags deve vir como um array' })
  tags: string[];

  @IsOptional()
  @MaxLength(350, {
    message: 'description: A descrição deve ter no máximo 350 caracteres',
  })
  description: string;
}
